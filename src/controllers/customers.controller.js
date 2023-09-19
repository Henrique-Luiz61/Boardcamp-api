import {
  createCustomerDB,
  getCustomerByCpfDB,
  getCustomerByIdDB,
  getCustomersDB,
} from "../repositories/customers.repository.js";

export async function postCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  try {
    const conflictCpf = await getCustomerByCpfDB(cpf);

    if (conflictCpf.rowCount > 0)
      return res.status(409).send({ message: "Already registered CPF!" });

    await createCustomerDB(name, phone, cpf, birthday);

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getCustomers(req, res) {
  try {
    const customers = await getCustomersDB();

    if (customers.rowCount === 0)
      return res.status(404).send({ message: "No registered customers" });

    res.send(customers.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getCustomerById(req, res) {
  const { id } = req.params;

  try {
    const customer = await getCustomerByIdDB(id);

    if (customer.rowCount === 0)
      return res.status(404).send({ message: "Customer not found!" });

    res.send(customer.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
