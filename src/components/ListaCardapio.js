import { useState, useEffect } from "react";
import './ListaCardapio.css'

const ListaCardapio = () => {
    const [listaCard, setListaCard] = useState([]);
    const [loading, setLoading] = useState(false);

    const API = "http://localhost:5000"

    const handleSubmit = (e) => {
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
                        <td>R$ {item.valor}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </section>
        <section>
        <form className="form-pedido" onSubmit={handleSubmit}>
        </form>
        </section>
        <section>
            <fieldset>
                <legend> Forma de Pagamento: </legend>
                <div className="forma-pagamento"> 
                    <input type="checkbox" id="dinheiro" name="dinheiro" checked />
                    <label for="dinheiro">Dinheiro</label>
                </div>
                <div className="forma-pagamento">
                    <input type="checkbox" id="debito" name="debito" />
                    <label for="debito">Debito</label>
                </div>
                <div className="forma-pagamento">
                    <input type="checkbox" id="credito" name="credito" />
                    <label for="credito">Credito</label>
                </div>
            </fieldset>
        </section>
    </div>

}

export default ListaCardapio;