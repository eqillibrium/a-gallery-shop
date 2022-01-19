const formatCurrency = price => {
    return new Intl.NumberFormat('ru-RU', {
        currency: 'rub',
        style: 'currency'
    }).format(price)
}

document.querySelectorAll('.price').forEach(node => {
    node.textContent = formatCurrency(node.textContent)
})

const cart = document.querySelector('#cart')

if(cart) {
    cart.addEventListener('click', async (event) => {
        if(event.target.classList.contains('js-remove')) {
            const id = event.target.dataset.id
            try {
                const response = await fetch(`/cart/remove/${id}`, {
                    method: 'DELETE'
                })
                const data = await response.json()
                    if(data.paintings.length) {
                        const html = data.paintings.map(el => {
                            return ` <tr>
                                        <td>${el.title}</td>
                                        <td>${el.count}</td>
                                        <td>
                                            <button class="btn btn-small js-remove" data-id="${el.id}">Удалить</button>
                                        </td>
                                      </tr>
                                    `
                        }).join('')
                        cart.querySelector('tbody').innerHTML = html
                        cart.querySelector('.price').textContent = formatCurrency(data.amount)
                    } else {
                        cart.innerHTML = `<p>Корзина пуста</p>`
                    }
            } catch (e) {
                console.log(e)
            }
        }
    })
}
