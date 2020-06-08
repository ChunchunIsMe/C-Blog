## 盒模型
一个盒子有: content/padding/border/margin

使用box-sizing来设置盒模型

- content-box(标准盒模型): 设置的宽高为content的宽高,盒子的实际宽高为 width/height+padding+border+margin
- padding-box: 设置的宽高为content+padding的宽高,盒子的实际宽高为 width/height+border+margin
- border-box(IE盒模型): 设置的宽高为content+padding+border的宽高,盒子的实际宽高为 width/height+margin
- margin-box: 设置的宽高为content+padding+border+margin的宽高,盒子的实际宽高为 width/height