const form = document.querySelector('.form');

const nameInp = document.querySelector('#name');
const Narx = document.querySelector('#price');
const iD = document.querySelector('#itemId');
const List = document.querySelector('.itemList');



form.addEventListener('submit', (e) => {

    e.preventDefault();

    if (iD.value) {
        item = JSON.parse(localStorage.getItem(iD.value));
        item.name = nameInp.value
        item.Narx = Narx.value
    } else {
        item = {
            name: nameInp.value,
            Narx: Narx.value
        }
        iD.value = `item ${Date.now()}`
    }

    localStorage.setItem(iD.value, JSON.stringify(item));

    form.reset();
    iD.value = '';
    renderList();
});

function renderList() {
    List.innerHTML = '';

    let totalPrise = 0;
    for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {

            const item = JSON.parse(localStorage.getItem(key));
            const li = document.createElement('li');

            li.innerHTML = `<span>${item.name}</span> <span>$${item.Narx}</span>`
            List.appendChild(li);

            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            li.appendChild(editBtn);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            li.appendChild(deleteBtn);

            editBtn.addEventListener('click', () => {
                nameInp.value = item.name;
                Narx.value = item.Narx;
                iD.value = key;
            })

            deleteBtn.addEventListener('click', () => {
                localStorage.removeItem(key);

                renderList();
            })
            totalPrise += Number(item.Narx);

        }


    }

    const totalItem = document.createElement('h4');
    totalItem.textContent = totalPrise;
    List.appendChild(totalItem);
}

renderList();