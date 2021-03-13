import { html, TemplateResult } from 'lit-html';
import '../dz-youtube.js';

export default {
  title: 'DzYoutube',
  component: 'dz-youtube',
  argTypes: {
    src: { control: 'text' },
    clientId: { control: 'text' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  src: string;
  clientId: string;
}

const Template: Story<ArgTypes> = ({
  src = 'https://youtube.com/embed/ByH9LuSILxU',
  clientId = '828207170600-nkmsj6m9nl6meo8qtfodp26v8hb1v3fn.apps.googleusercontent.com',
}: ArgTypes) => html`
  <dz-youtube .src=${src} .clientId=${clientId}> </dz-youtube>
`;

export const Regular = Template.bind({});

export const CustomSrc = Template.bind({});
CustomSrc.args = {
  src: 'https://youtube.com/embed/ByH9LuSILxU',
};

export const CustomClientId = Template.bind({});
CustomClientId.args = {
  clientId:
    '828207170600-nkmsj6m9nl6meo8qtfodp26v8hb1v3fn.apps.googleusercontent.com',
};
