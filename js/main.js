//Variáveis - Box de input
const inputPesquisaUsuario = document.querySelector('#inserir-user');
const pesquisarBtn = document.querySelector('#pesquisar');
//Variáveis - Box com dados principais do usuário
const imagemUsuario = document.querySelector('.icon');
const nomeUsuario = document.querySelector('.nome');
const usuarioGit = document.querySelector('.user');
const biografia = document.querySelector('#biografia');
const dataCriacaoConta = document.querySelector('.data-criacao-conta');
//Variáveis - Box com número do perfil
const repositorios = document.querySelector('.repositorio');
const seguidores = document.querySelector('.seguidores');
const seguindo = document.querySelector('.seguindo');
//Variáveis - Box com links e localização 
const localizacao = document.querySelector('.localizacao');
const linkPaginaWeb = document.querySelector('.pagina-web');
const usernameTwitter = document.querySelector('.twitter');
const linkEmpresarial = document.querySelector('.empresa');

async function renderiza() {
    try {
        const insereNovoUsuario = inputPesquisaUsuario.value;
        const resposta = await fetch(`https://api.github.com/users/${insereNovoUsuario}`);
        document.querySelector(".usuarios-box-externo").style.display = 'block';
        document.querySelector(".sem-resultados").style.display = 'none';

        if (resposta.status === 200) {
            const data = await resposta.json();
            console.log(data);

            imagemUsuario.src = data.avatar_url;
            nomeUsuario.textContent = data.name === null ? 'Usuário sem nome' : data.name;

            usuarioGit.textContent = data.login;
            const git = usuarioGit;
            git.href = (`https://github.com/${data.login}`)

            biografia.textContent = data.bio === null ? 'Não há bio neste perfil' : data.bio;

            const criadoEm = new Date(data.created_at);
            const dataFormatada = criadoEm.toLocaleDateString('pt-br', { day: 'numeric', month: 'short', year: 'numeric' });
            dataCriacaoConta.textContent = `Desde ${dataFormatada}`;

            repositorios.textContent = data.public_repos;
            seguidores.textContent = data.followers;
            seguindo.textContent = data.following;
            localizacao.textContent = data.location === null ? 'Não Disponível' : data.location;
            linkPaginaWeb.textContent = data.blog === "" ? 'Não disponível' : data.blog;
            const blog = linkPaginaWeb;
            blog.href = data.blog;
            usernameTwitter.textContent = data.twitter_username === null ? 'Não Disponível' : data.twitter_username;
            const twitter = usernameTwitter;
            twitter.href = (`https://twitter.com/${data.twitter_username}`)

            linkEmpresarial.textContent = data.company === null ? 'Não disponível' : data.company;
        }
        else if (resposta.status === 404) {
            document.querySelector(".usuarios-box-externo").style.display = 'none';
            document.querySelector(".sem-resultados").style.display = 'initial';
        }
    }
    catch (err) {
        alert("Algo deu errado, verifique e tente novamente.");
        console.log(err);
    }
}

inputPesquisaUsuario.addEventListener('keydown', function (e) {
    if (e.key == 'Enter') {
        renderiza();
    };
});
pesquisarBtn.addEventListener('click', () => {
    renderiza();
});