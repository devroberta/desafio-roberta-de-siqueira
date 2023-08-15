import React, { useState, useEffect } from "react";
import './ListaCardapio.css'
import formatCurrency from "../../utils/formatCurrency.js";
import Carrinho from "../carrinho/Carrinho.js"

const ListaCardapio = () => {
    const [listaCard, setListaCard] = useState([]);
    const [loading, setLoading] = useState(false);
    const [itemCarrinho, setItemCarrinho] = useState([]);

    const API = "http://localhost:5000"

    const handleSubmit = (event) => {
        event.preventDefault();
        alert('Item adicionado');
    }

    useEffect(() => {
        const loadData = async() => {
        setLoading(true);
        const res = await fetch(API + "/listaCardapio")
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err));
        
        setLoading(false);

        setListaCard(res);
        }

        loadData()

    }, [])

    return <div className="div-principal">
        <section>
        <table className="table-lista">
            <thead>
                <tr className="table-line-titulo">
                    <td colSpan="3">Cardápio</td>
                </tr>
                <tr className="table-line-titulo">
                    <td>Código</td>
                    <td>Descrição</td>
                    <td>Valor</td>
                </tr>
            </thead>

            <tbody>
                {listaCard.map((item) => (
                    <tr className="table-line-item" key={item.id}>
                        <td>{item.codigo}</td>
                        <td>{item.descricao}</td>
                        <td>{formatCurrency(item.valor, 'BRL')}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </section>

        <hr />
        
        <section>
            <form className="form-pedido" onSubmit={handleSubmit}>
                <label>Código Item: </label>
                <input type="text" name="item"></input>
                <input className="quantidade" type="number" min="0" /> unid
                <button className="button-adiciona">+</button>
            </form>
        </section>

        <section>
            <fieldset>
                <legend>Carrinho:</legend>
                <Carrinho />
            </fieldset>

        </section>

        <section>
            <fieldset>
                <legend> Forma de Pagamento: </legend>
                <div className="forma-pagamento"> 
                    <input type="radio" id="dinheiro" name="pagamento" value="1" />Dinheiro
                </div>
                <div className="forma-pagamento">
                    <input type="radio" id="debito" name="pagamento" value="2" />Debito
                </div>
                <div className="forma-pagamento">
                    <input type="radio" id="credito" name="pagamento" value="3" />Credito
                </div>
            </fieldset>
        </section>

        <section>
            <button type="submit">Enviar Pedido</button>
        </section>
    </div>

}

export default ListaCardapio;