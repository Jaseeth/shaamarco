Shaa Marco multi-page version

Files:
- index.html       Home
- about.html       About
- services.html    Services
- contact.html     Contact
- components/header.html  Shared header/mobile menu
- components/footer.html  Shared footer/floating phone button
- style.css        Original CSS + tiny multi-page support rules
- script.js        Original animations preserved + safe page checks + shared component loader

IMPORTANT:
Because header/footer are loaded with fetch(), run the site through a local web server such as VS Code Live Server.
Do not open index.html directly with file:// because browsers can block fetch() for local files.
