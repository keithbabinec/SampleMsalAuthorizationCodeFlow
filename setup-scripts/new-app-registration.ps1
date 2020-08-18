[CmdletBinding()]
param
(
    [Parameter(
        Mandatory=$true,
        HelpMessage="Specify the Azure AD app registration name. Example: test-authorization-flow-app")]
    [System.String]
    $AppRegistrationName,

    [Parameter(
        Mandatory=$true,
        HelpMessage="Specify the Azure AD RBAC role names to use in the app manifest. For example: MyAppUsersRole and MyAppAdministratorsRole.")]
    [System.String[]]
    $RbacRoleNames,

    [Parameter(Mandatory=$false)]
    [System.String]
    $AppHomePageUrl = "https://localhost:3000"
)

$ErrorActionPreference = "Stop"

$accounts = az account list
if ($accounts -contains "az login")
{
    Write-Host "Logging into Azure for the Azure CLI tooling."
    az login --allow-no-subscriptions
}
else
{
    Write-Host "Already logged into Azure CLI tooling."
}

Write-Host "Checking to see if the Azure AD app registration ($AppRegistrationName) already exists."

$cliEmptyResult = "[]"
$appRegistration = az ad app list --display-name $AppRegistrationName

if ($appRegistration -eq $cliEmptyResult)
{
    Write-Host "App registration doesn't exist. Creating it now."

    # 'native-app' in this case means public client.

    $newAppRegistrationResult = az ad app create `
        --display-name $AppRegistrationName `
        --available-to-other-tenants false `
        --homepage $AppHomePageUrl `
        --native-app false

    Write-Host "Successfull created new app registration: $($appRegistration.appId)"

    $appRegistration = ConvertFrom-Json -InputObject ($newAppRegistrationResult | Out-String)

    # setting implicit flow to disabled on the new app request doesn't actually shut this off
    # for the token. make a second call to update the app manifest just for this property.

    Write-Host "Setting manifest property: oauth2AllowImplicitFlow=false"
    $null = az ad app update --id $appRegistration.appId --set oauth2AllowImplicitFlow=false

    Write-Host "Setting manifest property: oauth2AllowIdTokenImplicitFlow=false"
    $null = az ad app update --id $appRegistration.appId --set oauth2AllowIdTokenImplicitFlow=false

    Write-Host "Adding RBAC roles to the application manifest."
    $roleObjects = New-Object -TypeName 'System.Collections.Generic.List[PSCustomObject]'

    foreach ($roleName in $RbacRoleNames)
    {
        $newRole = [PSCustomObject]@{
            allowedMemberTypes = @("User")
            description = $roleName
            displayName = $roleName
            isEnabled = "true"
            value = $roleName
        }

        $roleObjects.Add($newRole)
    }

    $roleObjects | ConvertTo-Json | Out-File .\manifest-roles.json

    $null = az ad app update --id $appRegistration.appId --app-roles @manifest-roles.json

    Remove-Item -Path .\manifest-roles.json

    Write-Host "App registration setup completed."
}
else
{
    Write-Host "App registration already exists. Creation will be skipped."    
}
