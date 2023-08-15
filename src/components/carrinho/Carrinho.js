import React from 'react';

const Carrinho = (item) => {

    const lista = [];
    lista.push(item);

    return <>
        <ol>
            {lista.map((item) => {
                <li key={item.id}>{item.codigo}</li>
                
            })}
        </ol>
    </>
}

export default Carrinho;