[CmdletBinding()]
param
(
)

#Requires -RunAsAdministrator

$ErrorActionPreference = "Stop"

Write-Host "Checking for Azure CLI tooling prerequisite."

# install the Azure CLI tools

try
{
    $null = az --version
    $cliToolsInstalled = $true
}
catch [System.Management.Automation.CommandNotFoundException]
{
    $cliToolsInstalled = $false
}

if ($cliToolsInstalled -eq $false)
{
    Write-Host "Azure CLI tooling was not found. Installing the latest version now."

    Write-Host "Downloading Azure CLI installer."
    Invoke-WebRequest -Uri https://aka.ms/installazurecliwindows -OutFile .\AzureCLI.msi

    Write-Host "Running Azure CLI installer."
    Start-Process msiexec.exe -Wait -ArgumentList '/I AzureCLI.msi /quiet'

    Write-Host "Removing Azure CLI installer file."
    Remove-Item .\AzureCLI.msi

    Write-Host "Installation completed. You should restart PowerShell to ensure the 'az' commands are available in the path."
}
else
{
    Write-Host 'Azure CLI tooling is already installed.'
}
