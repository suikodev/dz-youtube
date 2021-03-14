export class OAuth {
  public static getAccessToken() {
    return window.location.href.split('access_token=')[1]?.split('&')[0];
  }

  public static oauthSignIn(clientId: string) {
    const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
    const form = document.createElement('form');
    form.setAttribute('method', 'GET');
    form.setAttribute('action', oauth2Endpoint);

    const params: Record<string, string> = {
      client_id: clientId,
      redirect_uri: document.URL.split('#')[0],
      response_type: 'token',
      scope: 'https://www.googleapis.com/auth/youtube.force-ssl',
      include_granted_scopes: 'true',
      state: 'pass-through value',
    };

    for (const p of Object.keys(params)) {
      const input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', p);
      input.setAttribute('value', params[p]);
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
  }
}
