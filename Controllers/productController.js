const getAllProducts = async (req, res) => {
  try {
    const products = await db.query("SELECT * FROM products").rows;
    res
      .status(200)
      .json({ status: "success", results: products.length, data: products });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

const getProduct = async (req, res) => {
  const id = req.params.id;
  try {
    // const product = await db.query(`SELECT * FROM products where id =${id}`) this is vulnerable to SQL injection attacks
    const product = await db.query(`SELECT * FROM products where id =$1`, [id]) //parameterized query
      .rows[0];
    res.status(200).json({ status: "success", data: product });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

const createProduct = async (req, res) => {
  const { productName, price, description, discount, rating } = req.body;
  try {
    const product = await db.query(
      "INSERT INTO products ( productName, price, description, discount,rating) values ($1,$2,$3,$4,$5) returning *",
      [productName, price, description, discount, rating]
    );
    res.status(200).json({
      status: "success",
      message: "product created successfully",
      data: product.rows[0],
    });
    // res.status(200).json({ status: "success", data: product });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const { productName, price, description, discount, rating } = req.body;

  try {
    const newProduct = await db.query(
      "UPDATE products SET productName=$1, price=$2, description=$3, discount=$4,rating=$5 where id=$5 returning *",
      [productName, price, description, discount, rating, id]
    );
    res.status(200).json({
      status: "success",
      message: "product updated successfully",
      data: newProduct.rows[0],
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const results = await db.query("DELETE FROM products where id =$1", [id]);
    res.status(200).json({
      status: "success",
      message: "product deleted created successfully",
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  createProduct,
};
