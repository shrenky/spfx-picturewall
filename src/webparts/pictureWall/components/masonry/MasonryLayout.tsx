import * as React from 'react';
import { IMasonryLayoutProps } from './IMasonryLayoutProps';
import styles from './MasonryLayout.module.scss';
import * as Masonry from 'masonry-layout';

export class MasonryLayout extends React.Component<IMasonryLayoutProps> {
    private masonry: Masonry = undefined;
    public componentDidMount() {
        this.masonry = new Masonry(this.props.domElement.querySelector(`div.${styles.images}`), {
             itemSelector: 'img',
             columnWidth: 240,
             gutter: 4,
             
        });
   }

   public componentWillUnmount() {
        this.masonry.destroy();
   }

   render() {
     return (
        <div>
             <h1>Picture Wall</h1>
             <div className={styles.images}>
                  {
                    this.props.images.map((image) => {
                        return (
                            <img src={image.url} width="240" height="200" />
                        ); 
                    })
                  }
             </div>
        </div>
     );
   }
}