[CmdletBinding()]
param
(
    [Parameter(
        Mandatory=$true,
        HelpMessage="Specify the Azure AD app registration name. Example: test-authorization-flow-app")]
    [System.String]
    $AppRegistrationName,

    [Parameter(Mandatory=$false)]
    [System.String]
    $AppHomePageUrl = "https://localhost:3000/"
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

    $newAppRegistrationResult = az ad app create `
        --display-name $AppRegistrationName `
        --available-to-other-tenants false `
        --homepage $AppHomePageUrl `
        --native-app false `
        --reply-urls $AppHomePageUrl

    Write-Host "Successfull created new app registration: $($appRegistration.appId)"
    Write-Host "Disabling implicit grant flow properties."

    $appRegistration = ConvertFrom-Json -InputObject ($newAppRegistrationResult | Out-String)

    # setting implicit flow to disabled on the new app request doesn't actually shut this off
    # for the token. make a second call to update the app manifest just for this property.

    $null = az ad app update --id $appRegistration.appId --set oauth2AllowImplicitFlow=false --set oauth2AllowIdTokenImplicitFlow=false

    Write-Host "App registration setup completed."
}
else
{
    Write-Host "App registration already exists. Creation will be skipped."    
}
