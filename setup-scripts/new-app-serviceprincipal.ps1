[CmdletBinding()]
param
(
    [Parameter(
        Mandatory=$true,
        HelpMessage="Specify the Azure AD app registration name. Example: test-authorization-flow-app")]
    [System.String]
    $AppRegistrationName
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

Write-Host "Checking to see if the Azure AD app service principal (enterprise application) $AppRegistrationName already exists."

$cliEmptyResult = "[]"

$appRegistration = az ad app list --display-name $AppRegistrationName
if ($appRegistration -eq $cliEmptyResult)
{
    throw "App registration $AppRegistrationName was not found. Please create this application first and then re-run this script."
}

$appRegistration = ConvertFrom-Json -InputObject ($appRegistration | Out-String)
$appRegistrationId = $appRegistration.appId

$appServicePrincipal = az ad sp list --display-name $AppRegistrationName
if ($appServicePrincipal -eq $cliEmptyResult)
{
    Write-Host "App service principal doesn't exist. Creating it now."

    az ad sp create --id $appRegistrationId

    Write-Host "App service principal setup completed."

    Write-Host "ACTION REQUIRED: In the Azure AD app service principal (enterprise application), click on the Properties page, then set the User Assignment Required field to Yes"
    Write-Host "ACTION REQUIRED: In the Azure AD app service principal (enterprise application), click on the Users and Groups page, then assign users or groups to the custom app roles you have defined"
}
else
{
    Write-Host "App service principal already exists. Creation will be skipped."    
}