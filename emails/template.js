const template = (name, firstText, linkPath, secondText, linkText) => {
    return `
  <html lang="en">
    <head>
    <style>
    .container {
      width: 90%;
      margin: auto;
    }
    .jumbotron.jumbotron-fluid {
      background: #0e0a0aa6;
      color: white;
      padding: 1.5rem;
      text-align: center;
      font-family: monospace;
    }
    h4 {
      text-align: center;
      font-family: sans-serif;
    }
    .message-container {
      background: #f4f4f4;
      padding: 1rem;
    }
    p.lead {
      font-size: 16px;
      font-family: sans-serif;
    }
    a.btn {
      display: inline-block;
      text-decoration: none;
      padding: 0.4rem 1.3rem;
      font-size: 1rem;
      border: none;
      cursor: pointer;
      margin-right: 0.5rem;
      transition: opacity 0.2s ease-in;
      outline: none;
      background: #343a40;
      color: #fff;
      border-radius: 6px;
    }
    .dropdown-divider {
      width: 90%;
      background: #484e5361;
      height: 1px;
      margin: 17px auto;
      border-radius: 8px;
    }
  </style>
      <title> Travel App</title>
    </head>
    
    <body>
      <div class="container">
        <div class="jumbotron jumbotron-fluid">
          <div class="container">
            <h1 class="display-4 text-center">Travel App</h1>
          </div>
        </div>
        <section style="height: 40vh;">
          <h4 class="text-center">Hello ${name}</h4>
          <div class="message-container">
            <p class="lead">
              ${firstText}
            </p>
            <a href="${linkPath}" class="btn btn-dark">${linkText}</a>
            <div class="dropdown-divider"></div>
            <p>
              ${secondText}
            </p>
          </div>
        </section>
      </div>
    </body>
  </html>
  `
}
module.exports = template
