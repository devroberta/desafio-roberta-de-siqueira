import React from 'react';
import './Carrinho.css';

const Carrinho = ({codigo, quantidade}) => {

    const lista = [];

    function adicionar(codigo, quantidade) {
        lista.push([{"codigo": {codigo}, "quantidade": {quantidade}}]);
        return lista;
    }

    return ( 
        <> 
            {lista.map((item) => (
                <tr className='table-line-carrinho'>
                    <td>{item.codigo}</td>
                    <td>{item.quantidade}</td>
                    <td><button className='button-excluir'>x</button></td>
                </tr>
            ))}

        </>
    )
}

export default Carrinho;