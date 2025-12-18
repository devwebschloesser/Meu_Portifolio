const repositories = document.querySelector(".box-cards");

async function getApiGitHub() {
  try {
    const response = await fetch(
      "https://api.github.com/users/devwebschloesser/repos?per_page=100&sort=updated"
    );

    if (!response.ok) throw new Error("Erro ao buscar repositórios");

    const data = await response.json();

    repositories.innerHTML = "";

    const filteredRepos = data.filter((repo) => !repo.fork);

    filteredRepos.forEach((item) => {
      const cardProject = document.createElement("div");

      cardProject.innerHTML = `
        <div class="card">
          <div class="card-content">

            <img 
              class="img-card" 
              src="./images/animation_${item.name}.gif"
              draggable="false"
              onError="this.onerror=null; this.src='./images/code_working.gif';"
            >

            <h5 class="title-project">${item.name}</h5>
            <p class="desc-project">
              ${item.description || "Sem descrição"}
            </p>

            <div class="btn-card">
              <a href="${item.homepage || item.html_url}" target="_blank">
                <button class="btn-page">Página</button>
              </a>

              <a href="${item.html_url}" target="_blank">
                <button class="btn-code">Código</button>
              </a>
            </div>
          </div>
        </div>
      `;

      repositories.appendChild(cardProject);
    });

    colorLanguage();
  } catch (error) {
    console.error("Erro:", error);
  }
}

// CHAMADA DA FUNÇÃO
getApiGitHub();
