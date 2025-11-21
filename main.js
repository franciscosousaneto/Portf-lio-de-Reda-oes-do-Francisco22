document.addEventListener('DOMContentLoaded', function() {
    const menuNav = document.getElementById('menu');
    const modal = document.getElementById('modal-redacao');
    const fecharModal = document.querySelector('.fechar-modal');
    const modalTitulo = document.getElementById('modal-titulo');
    const modalTexto = document.getElementById('modal-texto');
    const crônicas = document.querySelectorAll('.cronica, .ensaio'); // Seleciona crônicas e ensaios

    // 1. Cria os links do menu
    const links = [
        { nome: '🏰 Início', href: '#conteudo' },
        { nome: '📜 Crônicas', href: '#cronicas-titulo' },
        { nome: '🖋️ Ensaios', href: '#ensaios' },
        { nome: '🔍 Sobre o Sábio', href: '#sobre' } // Este ainda não existe no HTML, mas mantém a estrutura
    ];
    let menuHTML = '';
    links.forEach(link => {
        menuHTML += `<a href="${link.href}">${link.nome}</a>`;
    });
    menuNav.innerHTML = menuHTML;


    // 2. Lógica para abrir o Modal (A 'área aparte')
    crônicas.forEach(cronica => {
        cronica.addEventListener('click', function() {
            // Pega o título e o conteúdo completo da seção clicada
            const titulo = this.querySelector('h3').textContent;
            
            // O conteúdo completo estará no div escondido.
            // Para os Ensaios, usaremos o resumo como conteúdo completo por simplicidade, ou você pode adicionar um div de conteúdo-completo neles também.
            let conteudoHTML = '';

            if (this.classList.contains('cronica')) {
                // Para Crônicas (Rascunho)
                conteudoHTML = this.querySelector('.conteudo-completo').innerHTML;
            } else if (this.classList.contains('ensaio')) {
                // Para Ensaios (Versão Aprimorada) - Adiciona um texto placeholder para a melhoria
                const id = this.getAttribute('data-id');
                const resumo = this.querySelector('.resumo').textContent;
                conteudoHTML = `
                    <p>${resumo}</p>
                    <p>Aqui você encontraria a versão **aprimorada e detalhada** (Ensaio) da ${titulo}. Esta seção conteria uma análise mais profunda, como um artigo acadêmico ou uma dissertação sobre os temas abordados no rascunho da Crônica ${id}.</p>
                    <p>O Sábio Escrivão ainda está a burilar o texto final desta obra, aprimorando seu argumento com a pena de um mestre.</p>
                `;
            }

            // Popula e exibe o modal
            modalTitulo.textContent = titulo;
            modalTexto.innerHTML = conteudoHTML;
            modal.style.display = 'block';

            // Impede a rolagem do corpo da página enquanto o modal estiver aberto
            document.body.style.overflow = 'hidden';
        });
    });

    // 3. Lógica para fechar o Modal
    fecharModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaura a rolagem
    });

    // Fecha o modal se o usuário clicar fora dele
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restaura a rolagem
        }
    });
});