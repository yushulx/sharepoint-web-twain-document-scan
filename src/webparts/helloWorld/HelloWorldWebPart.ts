import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HelloWorldWebPart.module.scss';
import * as strings from 'HelloWorldWebPartStrings';

import Dynamsoft from 'dwt';
import { WebTwain } from 'dwt/dist/types/WebTwain';

export interface IHelloWorldWebPartProps {
  description: string;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {
  private DWObject: WebTwain;
  private selectSources: HTMLSelectElement;
  private containerId = 'dwtcontrolContainer';
  private bWASM = false;
  private button: HTMLButtonElement;

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.helloWorld }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <span class="${ styles.title }">Welcome to SharePoint!</span>
              <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
              <p class="${ styles.description }">${escape(this.properties.description)}</p>
              <button class="${ styles.button } id="scan">Scan</button>
              <div id="${this.containerId}"></div>
            </div>
          </div>
        </div>
      </div>`;
      this.button = this.domElement.querySelector('button');
      this.button.addEventListener('click', this.acquireImage.bind(this));
  }

  public acquireImage(): void {
    if (!this.DWObject)
      this.DWObject = Dynamsoft.DWT.GetWebTwain();
    if (this.bWASM) {
      alert("Scanning is not supported under the WASM mode!");
    }
    else if (this.DWObject.SourceCount > 0) {
      const onAcquireImageSuccess = () => { this.DWObject.CloseSource(); };
      const onAcquireImageFailure = onAcquireImageSuccess;
      this.DWObject.OpenSource();
      this.DWObject.AcquireImage({}, onAcquireImageSuccess, onAcquireImageFailure);
    } else {
      alert("No Source Available!");
    }
  }

  protected onInit(): Promise<void> {
    return super.onInit().then(_ => {
      
      // Initialize the WebTwain object
      Dynamsoft.DWT.Containers = [{ WebTwainId: 'dwtObject', ContainerId: this.containerId, Width: '300px', Height: '400px' }];
      Dynamsoft.DWT.RegisterEvent('OnWebTwainReady', () => { this.Dynamsoft_OnReady(); });                                                        
      Dynamsoft.DWT.ResourcesPath = '/dist';
      Dynamsoft.DWT.ProductKey = 't00891wAAAKBfWo4sRRVNTyLqdC7nKomEJIfBYqfXWg5mblnP0eeJi+LsMIUdQvrBf//ocS3z8MJA47R4VdO4x24uJwlqKgkuZOa7BUQHPkFNA5hFSi6lG2qOK6I=';
      let checkScript = () => {
        if (Dynamsoft.Lib.detect.scriptLoaded) {
          Dynamsoft.DWT.Load();
        } else {
          setTimeout(() => checkScript(), 100);
        }
      };
      checkScript();
    });
  }

  public Dynamsoft_OnReady(): void {
    this.DWObject = Dynamsoft.DWT.GetWebTwain(this.containerId);
    this.bWASM = Dynamsoft.Lib.env.bMobile || !Dynamsoft.DWT.UseLocalService;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
