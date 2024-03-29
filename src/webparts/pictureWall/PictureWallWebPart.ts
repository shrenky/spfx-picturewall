import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'PictureWallWebPartStrings';
import PictureWall from './components/PictureWall';
import { IPictureWallProps } from './components/IPictureWallProps';

export interface IPictureWallWebPartProps {
  description: string;
}

export default class PictureWallWebPart extends BaseClientSideWebPart<IPictureWallWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPictureWallProps > = React.createElement(
      PictureWall,
      {
        description: this.properties.description,
        domElement: this.domElement
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
