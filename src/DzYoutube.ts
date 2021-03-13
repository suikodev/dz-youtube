import { html, css, LitElement, property } from 'lit-element';
import { OAuth } from './oauth';

export class DzYoutube extends LitElement {
  /**
   *
   */
  constructor() {
    super();
    this.oauth = new OAuth(this.clientId);
    this.isVideoUploadFormOpenning = !!this.oauth.accessToken;
  }

  static styles = css`
    :host {
      justify-content: center;
      display: flex;
      width: 100vw;
    }

    iframe {
      width: 40vw;
      height: 22.5vw;
    }

    form {
      display: flex;
      align-items: center;
    }
  `;

  @property({ type: String }) src = 'https://www.youtube.com/embed/DXUAyRRkI6k';

  @property({ type: String }) clientId = '';

  isVideoUploadFormOpenning: boolean;

  oauth: OAuth;

  render() {
    return html`
      <div>
        <iframe
          title="youtubeVideo"
          src=${this.src}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <button @click="${this.oauth.oauthSignIn}">upload video</button>
      </div>
    `;
  }
}
