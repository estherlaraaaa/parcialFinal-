window.onload = () => {
    let form = document.editoresForm;

    form.addEventListener('submit', () => {
        event.preventDefault();

        if (!form.name.value == "" && !form.propietario.value == "") {
            let editores = {
                name: form.name.value,
                propietario: form.propietario.value,
            }

            fetch('/editores', {
                method: 'POST',
                body: JSON.stringify(editores),
                headers: {
                    'Content-type': 'aplication/json',
                }
            })
                .then(res => { return res.json() })
                .then(data => {
                    if (data.ok)
                        addrow(data.editores);
                });
        }
    });

    //llenando la tabla 

    fetch('/editores', {
        method: 'GET',
    })
        .then(res => { return res.json() })
        .then(data => {
            if (data.ok) {
                let data = data.editores;
                data.data.forEach(element => {
                    addrow(element);
                })
            }
        })
}

function addrow(editores) {
    let tbody = document.getElementById('tablaBody');

    let tr = document.createElement('tr');

    let td_name = document.createElement('td');
    let td_propietario = document.createElement('td');
    let td_edit = document.createElement('td');
    let td_delete = document.createElement('td');

    td_name.innerText = editores.name;
    tr.appendChild(td_name);

    td_propietario.innerText = editores.propietario;
    tr.appendChild(td_propietario);

    td_edit.innerHTML = '<a href="#"> EDIT </a>';
    tr.appendChild(td_edit);

    td_delete.innerHTML = '<a href="#"> DELETE </a>';
    tr.appendChild(td_delete);

    tr.setAttribute("data-editoresId", editores._id);
    tbody.appendChild(tr);

    td_edit.childNodes[0].addEventListener('clic', function () {
        edit(editores._id)
    });

    td_delete.childNodes[0].addEventListener('clic', function () {
        del(editores._id)
    });
}

function del(editoresId) {
    fetch('/editores/' + editoresId, {
        method: 'DELETE ',
    })
        .then(res => { return res.json() })
        .then(deleted => {
            if (deleted.ok) {
                var to_remove = document.querySelector('[data-editoresId="' + editoresId + '"]');
                to: removeEventListener.parentNode.removeChild(to_remove);
            }
        });
}

function edit(editoresId) {
    var tr = document.querySelector('[data-editoresId="' + editoresId + '"]');

    var children = tr.childNodes;

    editoresOld = {
        name: children[0].innerText,
        propietario: children[1].innerText,
    }

    children[0].innerHTML = '<input type="text" name="up_name" placeholder="' + editoresOld.name + '">';
    children[1].innerHTML = '<input type="text" name="up_propietario" placeholder="' + editoresOld.propietario + '">';

    tr.removeChild(children[2]);
    tr.removeChild(children[2]);

    var update_btn = document.createElement('input');
    update_btn.type = "submit";
    update_btn.name = "up_submit";
    update_btn.value = "update";
    update_btn.className = "btn btn-warning"; 

    tr.appendChild(update_btn);

    update_btn.addEventListener('clic', function () {
        let updated = {
            name: childre[0].firstChild.value,
            propietario: childre[1].firstChild.value,
        };

        if (!updated.name == "" && !updated.propietario == "") {
            fetch('/editores/' + editoresId, {
                method: 'POST',
                body: JSON.stringify(updated),
                headers: {
                    'Content-type': 'aplication/json',
                }
            })
                .then(res => { return res.json() })
                .then(data => {
                    if (data.ok) {
                        while (tr.firstChild) {
                            tr.removeChild(tr.firstChild);
                        }

                        let td_name = document.createElement('td');
                        let td_propietario = document.createElement('td');
                        let td_edit = document.createElement('td');
                        let td_delete = document.createElement('td');

                        td_name.innerText = updated.name;
                        tr.appendChild(td_name);

                        td_propietario.innerText = updated.propietario;
                        tr.appendChild(td_propietario);

                        td_edit.innerHTML = '<a href="#"> EDIT </a>';
                        tr.appendChild(td_edit);

                        td_delete.innerHTML = '<a href="#"> DELETE </a>';
                        tr.appendChild(td_delete);

                        tr.setAttribute("data-editoresId", editores._id);
                        tbody.appendChild(tr);

                        td_edit.childNodes[0].addEventListener('clic', function () {
                            edit(editores._id)
                        });

                        td_delete.childNodes[0].addEventListener('clic', function () {
                            del(editores._id)
                        });
                    }
                }); 
        }

    })
}

