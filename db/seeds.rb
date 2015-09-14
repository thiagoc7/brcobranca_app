Client.create(name:"Thiago Correa", document: "000.222.333-55", ref: 1040)

Bank.create(
    name: "Bradesco",
    cedente: "Empresa XXXX LTDA",
    cedente_doc: "00.000.000/0001-00",
    cedente_address: "Rua AAAA, 333",
    agencia: "3900",
    conta_corrente: "233",
    carteira: "09",
    default_bank: true,
    instrucao_juros: "Após o Vencimento multa de 5,0% e juros de 4%a.m."
)

Bank.create(
    name: "Santander",
    cedente: "Empresa XXXX LTDA",
    cedente_doc: "00.000.000/0001-00",
    agencia: "2171",
    conta_corrente: "13000088",
    variacao: "9",
    convenio: "202303",
    instrucao_juros: "Após o Vencimento multa de 5,0% e juros de 4%a.m."
)

Boleto.create(
    client: Client.first,
    doc_number: "39000000007",
    date: Date.today,
    maturity: Date.today + 5.days,
    amount: 10.00,
    discount: 1.05
)