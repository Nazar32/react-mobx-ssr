import { template } from 'lodash';

// simple template systeme with lodash
export default (renderApp, _template) => {
  const compiled = template(_template.toString(), {
    interpolate: /{{([\s\S]+?)}}/g,
  });
  const html = compiled({
    app: renderApp.app,
    initialState: renderApp.initialState,
    styles: renderApp.styles,
    helmet: renderApp.helmet,
  });
  return html;
};
