// MAIN
const main = async() => {
    
    const body = document.getElementById('body');
    const div = document.createElement('div');

    const github = 'https://api.github.com/users/lazoliver/repos';

    await fetch(github)
        .then((res) => {
            return res.json();
        })
        .then((data) => {

            body.appendChild(div);

            data.map((obj) => {
                if(`${obj.name}` === 'back-end_node') {
                    const h2 = document.createElement('h2');
                    div.appendChild(h2).innerText = `${obj.name}`;
                    const a = document.createElement('a');
                    a.innerText = 'Visit';
                    div.appendChild(a).setAttribute('href', `${obj.url}`);
                }
            })
        })
        .catch((err) => {
            console.log(`Ocorreu um erro no Main: ${err}`);
        })
}

const menuHeader = async(header) => {
    
    const nav = document.createElement('nav');
    const ul = document.createElement('ul');

    const menuJson = './blocks/component/menu-header.json';

    await fetch(menuJson)
        .then((res) => {

            if(!res.ok) throw Error(res.statusText);
            return res.json();

        })
        .then((data) => {

            header.appendChild(nav).appendChild(ul).setAttribute('class', `${data.props}`);

            data.menu.map((obj) => {

                // Criar os LI's
                const li = document.createElement('li');
                ul.appendChild(li).id = `${obj.id}`;
                const p = document.createElement('p');
                li.appendChild(p).innerText = `${obj.title}`;

                if(obj.sub_category !== undefined) {

                    // Dropdown
                    const div = document.createElement('div');
                    li.appendChild(div);

                    // Dropdown Links
                    obj.sub_category.map((response) => {
                        const a = document.createElement('a');
                        div.appendChild(a).innerText = `${response.id}`;
                    })
                }

            })

        })
        .catch((err) => {
            console.log(`Ocorreu um erro no Menu: ${err}`);
        })

}

const header = async() => {
    
    const body = document.getElementById('body');
    const header = document.createElement('header');
    const h1 = document.createElement('h1');

    const headerJson = './blocks/header.json';

    await fetch(headerJson)
        .then((res) => {
            if(!res.ok) throw Error(res.statusText);
            return res.json();
        })
        .then((data) => {
            body.appendChild(header).setAttribute('class', `${data.props}`)
            header.appendChild(h1);
            h1.innerText = `${data.title}`;
        })
        .catch((err) => {
            console.log(`Ocorreu um erro no Header: ${err}`);
        })
    menuHeader(header);
        
}

const construir = () => {
    
    header()
    main()

}

construir()