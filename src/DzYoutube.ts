import { html, css, LitElement, property } from 'lit-element';

export class DzYoutube extends LitElement {
  static styles = css`
    :host {
      justify-content: center;
      display: flex;
      width: 100vw;
    }

    iframe {
      width: 80vw;
      height: 45vw;
    }
  `;

  @property({ type: String }) src = "https://www.youtube.com/embed/DXUAyRRkI6k";

  render() {
    return html`
      <div>
        <iframe title="youtubeVideo" src=${this.src} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    `;
  }
}
