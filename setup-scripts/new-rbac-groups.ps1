[CmdletBinding()]
param
(
    [Parameter(
        Mandatory=$true,
        HelpMessage="Specify the Azure AD RBAC group names to create. For example: MyAppUsers and MyAppAdministrators.")]
    [System.String[]]
    $RbacGroupNames
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

$cliEmptyResult = "[]"

foreach ($groupName in $RbacGroupNames)
{
    Write-Host "Checking if the Azure AD security group '$groupName' exists."

    $groupResult = az ad group list --display-name $groupName

    if ($groupResult -eq $cliEmptyResult)
    {
        Write-Host "Group doesn't exist, creating it now."
        $null = az ad group create --display-name $groupName --mail-nickname $groupName
    }
    else
    {
        Write-Host "Group already exists, creation will be skipped."
    }
}

Write-Host "Group setup has completed."