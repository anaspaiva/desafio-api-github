const inputPesquisaUsuario = document.querySelector('#inserir-user');
const pesquisarBtn = document.querySelector('#pesquisar');

const imagemUsuario = document.querySelector('.icon');
const nomeUsuario = document.querySelector('.nome');
const usuarioGit = document.querySelector('.user');
const biografia = document.querySelector('#biografia');
const dataCriacaoConta = document.querySelector('.data-criacao-conta');

const textoDadosPerfil = document.querySelector('.texto');
const repositorios = document.querySelector('.repositorio');
const seguidores = document.querySelector('.seguidores');
const seguindo = document.querySelector('.seguindo');

const localizacao = document.querySelector('.localizacao');
const linkPaginaWeb = document.querySelector('.pagina-web');
const usernameTwitter = document.querySelector('.twitter');
const linkEmpresarial = document.querySelector('.empresa');


pesquisarBtn.addEventListener('click', async () => {
    const insereNovoUsuario = inputPesquisaUsuario.value;
    //inputPesquisaUsuario = null;

    try {
        const resposta = await fetch(`https://api.github.com/users/${insereNovoUsuario}`);

        if (resposta.status === 200) {
            const data = await resposta.json();
            console.log(data);

            imagemUsuario.src = `${data.avatar_url}`;
            nomeUsuario.innerText = `${data.name}`;
            usuarioGit.innerText = `${data.login}`;
            biografia.innerText = (data.bio === null) ? 'Não há bio neste perfil' : `${data.bio}`;
            dataCriacaoConta.innerText = `Desde ${data.created_at}`;
            repositorios.innerText = `${data.public_repos}`;
            seguidores.innerText = `${data.followers}`;
            seguindo.innerText = `${data.following}`;

            localizacao.innerText = (data.location === null) ? 'Não Disponível' : `${data.location}`;


            linkPaginaWeb.innerHTML = (data.blog === "") ? 'Não Disponível' : `${data.blog}`;


            usernameTwitter.innerText = (data.twitter_username === null || "") ? 'Não Disponível' : `${data.twitter_username}`;

            linkEmpresarial.innerText = (data.company === null || "") ? 'Não disponível' : `${data.company}`;
        }
    }
    catch (erro) {
        console.log(erro);
    }
}
)
