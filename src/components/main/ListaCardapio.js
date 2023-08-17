import React, { useState, useEffect } from "react";
import './ListaCardapio.css'
import formatCurrency from "../../utils/formatCurrency.js";

const ListaCardapio = () => {
    const [bdLista, setBdLista] = useState([]);
    const [loading, setLoading] = useState(false);
    const [codigo, setCodigo] = useState("");
    const [quantidade, setQuantidade] = useState(1);
    const [listaCarrinho, setListaCarrinho] = useState([]);
    const [pagamento, setPagamento] = useState("dinheiro");

    const API = "http://localhost:5000"

    const handleSubmit = (e) => {
        e.preventDefault();

        const item = {
            codigo,
            quantidade
        }
        
        if(quantidade == 0) { 
            alert("Quantida não pode ser = 0");
        } else {
            const itemBuscado = listaCarrinho.filter(i => i.codigo == codigo);

            if(itemBuscado != 0) {
                listaCarrinho.map((upItem) => {
                    if(upItem.codigo === codigo) {
                        upItem.quantidade += parseInt(item.quantidade);
                        alert("Item já existe, será adicionado a quantia ao item existente.")
                    }
                })
            } else {
                listaCarrinho.push(item);
            }
        }

        setCodigo("");
    }

    const handleOnClick = (e) => {
        setPagamento((document.querySelector('input[name="pagamento"]:checked')).value);
        alert(`Confirma forma de pagamento: ${pagamento}`);
    }


    const handleDelete = (id) => {
        listaCarrinho.splice(id, 1);
    }

    useEffect(() => {
        const loadData = async() => {
        setLoading(true);
        const res = await fetch(API + "/listaCardapio")
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err));
        
        setLoading(false);

        setBdLista(res);

        setListaCarrinho(listaCarrinho);

        }

        loadData()

    }, [])

    function verificarPagamento() {
        const pgtos = document.getElementsByName("pagamento");
        
        for (let i in pgtos)
            if(pgtos[i].checked) alert(pgtos[i].value);
        
    }

    return (
        <div className="div-principal">
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
                    {bdLista.map((item) => (
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
                    <label htmlFor="codigo">Código Item: </label>
                    <input 
                        type="text" 
                        name="codigo" 
                        placeholder="Digite o Código do Item" 
                        onChange={(e) => setCodigo(e.target.value)} 
                        value={codigo || ""}
                        required
                    />

                    <input 
                        className="quantidade" 
                        type="number" 
                        name="quantidade"  
                        onChange={(e) => setQuantidade(e.target.value)} 
                        value={quantidade}
                        min="0" 
                    /> unid

                    <button className="button-adiciona" type="submit" value="Enviar">+</button>
                </form>
            </section>

            <section>
                <fieldset>
                    <legend>Carrinho:</legend>
                    {listaCarrinho.length == 0 && <p className="itemCarrinho">Nenhum item adicionado</p>}
                    {listaCarrinho.map((item) => (
                        <tr className="table-line-carrinho" key={item.codigo}>
                            <td>{item.codigo}</td>
                            <td>{item.quantidade}</td>
                            <td><button className='button-excluir' onClick={() => handleDelete(item.codigo)}>x</button></td>
                        </tr>
                    ))}
                </fieldset>

            </section>

            <section>
                <fieldset>
                    <legend> Forma de Pagamento: </legend>
                    <div className="forma-pagamento"> 
                        <input type="radio" id="dinheiro" name="pagamento" value="dinheiro" />Dinheiro
                    </div>
                    <div className="forma-pagamento">
                        <input type="radio" id="debito" name="pagamento" value="debito" />Debito
                    </div>
                    <div className="forma-pagamento">
                        <input type="radio" id="credito" name="pagamento" value="credito" />Credito
                    </div>
                </fieldset>
            </section>

            <section>
                <button type="button" onClick={handleOnClick}>Enviar Pedido</button>
            </section>
        </div>
    )

}

export default ListaCardapio;