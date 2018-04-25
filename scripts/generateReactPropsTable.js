// https://github.com/TeamWertarbyte/react-props-md-table/blob/master/index.js
const reactDocs = require('react-docgen');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(1);
const filename = args[args.length - 1];
const content = fs.readFileSync(path.resolve(process.cwd(), filename), 'utf-8');

const config = {
  output: 'README.md',
};

if (!config.propsCommentBegin) {
  config.propsCommentBegin = '<!-- --begin-insert-props-- -->';
}
if (!config.propsCommentEnd) {
  config.propsCommentEnd = '<!-- --end-insert-props-- -->';
}

let markdown = '';
const component = reactDocs.parse(content);

markdown += `### ${component.displayName}\n\n`;

// Global Component
formatHeader();
formatProps(component.props);

// Separate shape props
if (config.shape) {
  Object.keys(config.shape).map(name => {
    markdown += `\n### ${config.shape[name].name}\n\n`;

    formatHeader();
    const formatedProps = Object.keys(
      component.props.src.type.value.value
    ).forEach(name => {
      const elem = component.props.src.type.value.value[name];
      elem.type = { name: elem.name };
    });
    formatProps(component.props.src.type.value.value);
  });
}

const text = fs.readFileSync(config.output, 'utf8');

const begin =
  text.indexOf(config.propsCommentBegin) + config.propsCommentBegin.length + 1;
const end = text.indexOf(config.propsCommentEnd);
markdown = text.substring(0, begin) + markdown + text.substring(end);

// Write the file
fs.writeFileSync(config.output, markdown);

function formatType(name, type) {
  if (type.name === 'union') {
    return type.value.map(formatType).join('|');
  }
  if (type.name === 'arrayOf') {
    if (type.value.name === 'shape') {
      return `${type.name}[${config.shape[name].name}]`;
    }
    return `${type.name}[${type.value.raw}]`;
  } else {
    return type.name;
  }
}

function formatDefaultValue(type, defaultValue) {
  if (type.name === 'object') {
    return '';
  } else if (defaultValue) {
    return `\`${defaultValue.value}\``;
  } else {
    return '';
  }
}

function formatName(name, required) {
  if (required) {
    return `**${name}***`;
  }
  return name;
}

function formatHeader() {
  const headers = ['Name', 'Type', 'Default', 'Description'];
  markdown += `|${headers.join('|')}|\n`;
  markdown += `|${headers.map(() => '---').join('|')}|\n`;
}

function formatProps(props) {
  props = Object.entries(props).map(
    ([name, { type, required, description, defaultValue }]) => {
      if (description === '@internal') {
        return false;
      }
      return {
        name: formatName(name, required),
        defaultValue: formatDefaultValue(type, defaultValue),
        type: `\`${formatType(name, type)}\``,
        description,
        required,
      };
    }
  );

  props = props.filter(value => value !== false);

  for (const { name, defaultValue, type, description } of props) {
    markdown += `|${name}|${type}|${defaultValue}|${description}|\n`;
  }
}
