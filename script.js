    // 1. Setting Up the Environment: The code starts with an Immediately Invoked Function Expression (IIFE) to encapsulate 
    // everything within its scope and uses use strict for stricter coding practices.
    
!(function () {
  "use strict";

    // It imports the marked library for parsing Markdown text into HTML.
    // It configures marked to automatically add line breaks (breaks: true) and uses Prism.js for syntax highlighting of code blocks (highlight function).
    
  marked.setOptions({
    breaks: !0,
    highlight: function (e) {
      return Prism.highlight(e, Prism.languages.javascript, "javascript");
    },
  });

    // A new marked.Renderer object (e) is created to customize how Markdown elements are rendered as HTML.
    // The link function within the renderer modifies how links are displayed, adding a target="_blank" attribute to open links in a new tab.
    
  const e = new marked.Renderer();

  e.link = function (e, t, a) {
    return '<a target="_blank" href="'.concat(e, '">').concat(a, "</a>");
  };

        // 2. A React component class named t is defined. This class represents the entire Markdown previewer application.
                // The constructor initializes the component's state with three properties:
                    // markdown: Stores the Markdown text entered by the user (initially set to a sample text r).
                    // editorMaximized: Boolean indicating if the editor pane is maximized (initially false).
                    // previewMaximized: Boolean indicating if the preview pane is maximized (initially false).
    
  class t extends React.Component {
    constructor(e) {
      super(e),
        (this.state = {
          markdown: r,
          editorMaximized: !1,
          previewMaximized: !1,
        }),

        // The class also defines several functions for handling user interactions:
                // handleChange: Updates the markdown state based on the user's input in the editor.
                // handleEditorMaximize: Toggles the editorMaximized state to maximize/minimize the editor pane.
                // handlePreviewMaximize: Toggles the previewMaximized state to maximize/minimize the preview pane.
    
        (this.handleChange = this.handleChange.bind(this));
      this.handleEditorMaximize = this.handleEditorMaximize.bind(this);
      this.handlePreviewMaximize = this.handlePreviewMaximize.bind(this);
    }
    handleChange(e) {
      this.setState({ markdown: e.target.value });
    }
    handleEditorMaximize() {
      this.setState({ editorMaximized: !this.state.editorMaximized });
    }
    handlePreviewMaximize() {
      this.setState({ previewMaximized: !this.state.previewMaximized });
    }

        // The render function defines the application's layout and elements:
            // It uses a conditional statement to determine the classes applied to the editor and preview panes based on the maximized state.
            // It uses React.createElement to create various React elements: A main container (div).
            // The editor pane (div with editorWrap class):
            // A toolbar component (a) displaying the title "Editor" and a maximize/minimize button.
            // A textarea component (n) for the user to enter Markdown text.
            // A separator (div with converter class).
            // The preview pane (div with dynamic class based on maximized state):
            // A toolbar component (a) displaying the title "Previewer" and a maximize/minimize button.
            // A div component (i) displaying the HTML preview of the entered Markdown text using marked and the custom renderer (e).
      
    render() {
      const e = this.state.editorMaximized
        ? ["editorWrap maximized", "previewWrap hide", "fa fa-compress"]
        : this.state.previewMaximized
        ? ["editorWrap hide", "previewWrap maximized", "fa fa-compress"]
        : ["editorWrap", "previewWrap", "fa fa-arrows-alt"];

      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: e[0] },
          React.createElement(a, {
            icon: e[2],
            onClick: this.handleEditorMaximize,
            text: "Editor",
          }),
          React.createElement(n, {
            markdown: this.state.markdown,
            onChange: this.handleChange,
          })
        ),

        React.createElement("div", { className: "converter" }),

        React.createElement(
          "div",
          { className: e[1] },

          React.createElement(a, {
            icon: e[2],
            onClick: this.handlePreviewMaximize,
            text: "Previewer",
          }),

          React.createElement(i, { markdown: this.state.markdown })
        )
      );
    }
  }

  const a = (e) =>
      React.createElement(
        "div",
        { className: "toolbar" },

        React.createElement("i", {
          className: "fa fa-free-code-camp",
          title: "no-stack-dub-sack",
        }),
        e.text,

        React.createElement("i", { className: e.icon, onClick: e.onClick })
      ),
    n = (e) =>
      React.createElement("textarea", {
        id: "editor",
        onChange: e.onChange,
        type: "text",
        value: e.markdown,
      }),
    i = (t) =>
      React.createElement("div", {
        dangerouslySetInnerHTML: {
          __html: marked(t.markdown, { renderer: e }),
        },
        id: "preview",
      }),
    r =
      "# Welcome to my React Markdown Previewer!\n\n## This is a sub-heading...\n### And here's some other cool stuff:\n\nHeres some code, `<div></div>`, between 2 backticks.\n\n```\n// this is multi-line code:\n\nfunction anotherExample(firstLine, lastLine) {\n  if (firstLine == '```' && lastLine == '```') {\n    return multiLineCode;\n  }\n}\n```\n\nYou can also make text **bold**... whoa!\nOr _italic_.\nOr... wait for it... **_both!_**\nAnd feel free to go crazy ~~crossing stuff out~~.\n\nThere's also [links](https://www.freecodecamp.org), and\n> Block Quotes!\n\nAnd if you want to get really crazy, even tables:\n\nWild Header | Crazy Header | Another Header?\n------------ | ------------- | -------------\nYour content can | be here, and it | can be here....\nAnd here. | Okay. | I think we get it.\n\n- And of course there are lists.\n  - Some are bulleted.\n     - With different indentation levels.\n        - That look like this.\n\n\n1. And there are numbered lists too.\n1. Use just 1s if you want!\n1. And last but not least, let's not forget embedded images:\n\n![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)\n";

  ReactDOM.render(React.createElement(t, null), document.getElementById("app"));
})();
