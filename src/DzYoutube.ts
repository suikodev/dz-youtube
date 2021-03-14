import { html, css, LitElement, property } from 'lit-element';

import { OAuth } from './oauth';

export class DzYoutube extends LitElement {
  /**
   *
   */
  constructor() {
    super();
    this.handleUploadButtonClick = this.handleUploadButtonClick.bind(this);
    this.handleFileSelected = this.handleFileSelected.bind(this);
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
      flex-direction: column;
      justify-content: center;
      padding: 1rem;
      width: 30vw;
    }

    input {
      margin-bottom: 1rem;
    }
  `;

  @property({ type: String }) src = '';

  @property({ type: String, attribute: 'client-id' }) clientId = '';

  @property({ type: String, attribute: 'client-secret' }) clientSecret = '';

  title = '';

  description = '';

  categoryId = 0;

  render() {
    return html`
      <iframe
        title="youtubeVideo"
        src=${this.src}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <form id="upload-video-form">
        <label for="video-title">video title:</label>
        <input type="text" id="video-title" name="video-title" value="" />
        <label for="video-discription">video description:</label>
        <input
          type="text"
          id="video-description"
          name="video-description"
          value=""
        />
        <label for="video-category">video category</label>
        <input
          type="number"
          id="video-category"
          name="video-category"
          value="0"
        />
        <input
          type="file"
          accept="video/*"
          id="video-file"
          name="video-file"
          @change="${this.handleFileSelected}"
          style="display: none"
        />
        <div>
          <button @click="${this.handleUploadButtonClick}">upload video</button>
        </div>
      </form>
    `;
  }

  handleUploadButtonClick(e: Event) {
    e.preventDefault();
    if (!OAuth.getAccessToken()) {
      OAuth.oauthSignIn(this.clientId);
    } else {
      this.title =
        (<HTMLInputElement>this.shadowRoot?.getElementById('video-title'))
          .value || '';
      this.description =
        (<HTMLInputElement>this.shadowRoot?.getElementById('video-description'))
          .value || '';
      this.categoryId =
        (<HTMLInputElement>this.shadowRoot?.getElementById('video-category'))
          .valueAsNumber || 0;
      if (!this.title || !this.description || !this.categoryId) {
        alert('please fill all field.');
        return;
      }
      this.shadowRoot?.getElementById('video-file')?.click();
    }
  }

  handleFileSelected(e: Event) {
    const { files } = e.target as HTMLInputElement;
    if (files === null) {
      alert('please choose a video!');
      return;
    }

    const snippet = {
      title: this.title,
      description: this.description,
      categoryId: this.categoryId,
    };

    window
      .fetch(
        `https://youtube.googleapis.com/upload/youtube/v3/videos?part=snippet&key=${this.clientSecret}&uploadType=resumable`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${OAuth.getAccessToken()}`,
          },
          body: JSON.stringify(snippet),
        }
      )
      .then(resp => {
        const uploadLocation = resp.headers.get('location') || '';
        window
          .fetch(uploadLocation, {
            headers: {
              Authorization: `Bearer ${OAuth.getAccessToken()}`,
            },
            method: 'POST',
            body: files[0],
          })
          .then(uploadedFileResp => {
            uploadedFileResp.json().then(value => {
              this.src = `https://youtube.com/embed/${value.id}`;
            });
          });
      });
  }
}
