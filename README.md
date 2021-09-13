# SharePoint Document Scanning
Scanning documents in SharePoint with [Dynamic Web TWAIN](https://www.dynamsoft.com/web-twain/overview/) API.

## Usage
1. Get a license from [here](https://www.dynamsoft.com/customer/license/trialLicense?product=dwt).
2. Update the the following line with your license key in `HelloWorldWebPart.ts`.
    
    ```typescript
    Dynamsoft.DWT.ProductKey = "Your license key";
    ```
3. Install dependencies:

    ```bash
    npm install
    ```

4. Run the application and visit `https://localhost:4321/temp/workbench.html`:
    ```bash
    gulp serve
    ```

    ![Web TWAIN for scanning documents in SharePoint](https://www.dynamsoft.com/blog/wp-content/uploads/2021/09/sharepoint-web-twain.jpg)        

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development