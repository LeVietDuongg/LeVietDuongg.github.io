from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

# Thư mục static và templates đã được định nghĩa đúng
app.static_folder = 'static'

# Dữ liệu sản phẩm
products = [
    {"id": 1, "name": "Áo thun nam", "price": 120000, "image": "https://via.placeholder.com/150"},
    {"id": 2, "name": "Quần jeans nữ", "price": 350000, "image": "https://via.placeholder.com/150"},
    {"id": 3, "name": "Giày thể thao", "price": 600000, "image": "https://via.placeholder.com/150"},
    {"id": 4, "name": "Túi xách", "price": 450000, "image": "https://via.placeholder.com/150"},
]

# Dữ liệu giỏ hàng (giả lập)
cart = []

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/products', methods=['GET'])
def get_products():
    return jsonify(products)

@app.route('/api/cart', methods=['GET'])
def get_cart():
    return jsonify(cart)

@app.route('/api/cart', methods=['POST'])
def add_to_cart():
    product_id = request.json.get('id')
    for product in products:
        if product['id'] == product_id:
            cart.append(product)
            return jsonify({"message": "Thêm sản phẩm vào giỏ hàng thành công!"}), 200
    return jsonify({"message": "Sản phẩm không tồn tại!"}), 404

if __name__ == '__main__':
    app.run(debug=True)
