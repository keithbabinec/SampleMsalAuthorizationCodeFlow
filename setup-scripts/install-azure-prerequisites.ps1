[CmdletBinding()]
param
(
    [Parameter(Mandatory=$false)]
    [System.String]
    $AzureAdVersion = "2.0.2.106"
)

Write-Host "Checking for Azure module prerequisites."

if ($PSEdition -eq "Core")
{
    throw "The AzureAD PowerShell module is not supported in PowerShell Core. Please run this script from a Windows PowerShell (5.1) instance."
}

# install the AzureAd PowerShell module

if ((Get-Module -ListAvailable -Name AzureAd) -eq $null)
{
    Write-Host "Installing AzureAd module version $AzureAdVersion."
    Install-Module -Name AzureAd -RequiredVersion $AzureAdVersion -Force -Scope CurrentUser
}
else
{
    Write-Host 'AzureAD module is already installed.'
}
