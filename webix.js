(function () {

  const interceptors = {};

  function parse(code) {
    const elements = [];

    const buttonRegex = /button\s+"([^"]+)"\s*{([\s\S]*?)}/g;

    let match;
    while ((match = buttonRegex.exec(code))) {
      const text = match[1];
      const body = match[2];

      const onClickMatch = /onClick\s*{([\s\S]*?)}/.exec(body);

      elements.push({
        type: "button",
        text,
        onClick: onClickMatch ? onClickMatch[1].trim() : null
      });
    }

    return elements;
  }

  function run(code) {
    const elements = parse(code);

    elements.forEach(el => {
      if (el.type === "button") {
        const btn = document.createElement("button");
        btn.innerText = el.text;

        if (el.onClick) {
          btn.onclick = () => {
            execute(el.onClick);
          };
        }

        document.body.appendChild(btn);
      }
    });
  }

  function execute(code) {
    // alert simples
    const alertMatch = /alert\s+"([^"]+)"/.exec(code);
    if (alertMatch) {
      alert(alertMatch[1]);
    }

    // console
    const consoleMatch = /console\s+"([^"]+)"/.exec(code);
    if (consoleMatch) {
      console.log(consoleMatch[1]);
    }
  }

  function init() {
    const scripts = document.querySelectorAll('script[type="text/webix"]');

    scripts.forEach(script => {
      run(script.innerText);
    });
  }

  document.addEventListener("DOMContentLoaded", init);

})();
