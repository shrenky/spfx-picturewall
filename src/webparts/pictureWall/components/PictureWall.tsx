import * as React from 'react';
import styles from './PictureWall.module.scss';
import { IPictureWallProps } from './IPictureWallProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { ImageInfo } from './IPictureWallStates';
import { IPictureWallStates } from './IPictureWallStates';
import { sp } from '@pnp/sp';
import { Spinner } from 'office-ui-fabric-react';
import { MasonryLayout } from './masonry/MasonryLayout';

export default class PictureWall extends React.Component<IPictureWallProps, IPictureWallStates> {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }

  public componentWillMount() {
    sp.web.lists.getByTitle('picture%20library')
    .items
    .select('Title', 'Description', 'FileRef/FileRef')
    .get()
    .then(items => {
      let imagesInfo:ImageInfo[] = [];
      items.map(item => {
        imagesInfo.push({
          url: item.FileRef,
          title: item.Title,
          description: item.Description
        });
      });
      this.setState({
        images: imagesInfo
      });
    })
  }

  public render(): React.ReactElement<IPictureWallProps> {
    return (
      <div>
        {
          this.state.images.length == 0 ? <Spinner label='loading...' /> :
          <MasonryLayout images={this.state.images} domElement={this.props.domElement} />
        }
      </div>
    );
  }
}
