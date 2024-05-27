package com.nguyenvu.backend.service.impl;
import lombok.AllArgsConstructor;
import java.util.List;
import com.nguyenvu.backend.entity.Product;
import com.nguyenvu.backend.repository.ProductRepository;
import com.nguyenvu.backend.service.ProductService;
import java.util.Optional;
import java.util.ArrayList;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {
    private ProductRepository productRepository;
    public List<Product> getProductsByCondition(String title, Long category){
        if(title != null && category != null){
            return productRepository.findByTitleAndCategoryId(title,category);
        }else if (title !=null){
            return productRepository.findByTitle(title);
        }else if (category !=null){
            return productRepository.findByCategoryId(category);
        }else{
            return new ArrayList<>();
        }
    }


    @Override
    public Product createProduct(Product Product) {
        return productRepository.save(Product);
    }

    @Override
    public Product getProductById(Long ProductId){
        Optional<Product> optionalProduct = productRepository.findById(ProductId);
        return optionalProduct.get();
    }

     @Override
    public Page<Product> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    @Override
    public Product updateProduct(Product Product){
        Product existingProduct = productRepository.findById(Product.getId()).get();
        existingProduct.setTitle(Product.getTitle());
        existingProduct.setPrice(Product.getPrice());
        existingProduct.setDiscount(Product.getDiscount());
        existingProduct.setThumbnail(Product.getThumbnail());
        existingProduct.setDescription(Product.getDescription());

        existingProduct.setCreated_at(Product.getCreated_at());
        existingProduct.setUpdated_at(Product.getUpdated_at());
        existingProduct.setDeleted(Product.getDeleted());
        existingProduct.setCategory(Product.getCategory());
        existingProduct.setGalleries(Product.getGalleries());
        existingProduct.setOrderDetails(Product.getOrderDetails());

        Product updateProduct = productRepository.save(existingProduct);
        return updateProduct;
    }

    @Override
    public void deleteProduct(Long productId){
        productRepository.deleteById(productId);
    }
    public List<Product> getLatestProductsInCategory(Long categoryId, int pageSize) {
PageRequest pageRequest = PageRequest.of(0, pageSize, Sort.by(Sort.Direction.DESC, "created_at"));
return productRepository.findLatestProductsInCategory(categoryId, pageRequest);
}
public interface ProductService {
    public Product createProduct(Product Product);
    public Product getProductById(Long ProductId);
    public Page<Product> getAllProducts(Pageable pageable);
    public Product updateProduct(Product Product);
    public void deleteProduct(Long ProductId);
    public List<Product> getLatestProductsInCategory(Long categoryId, int pageSize);
    public Page<Product> getProductsByCategoryId(Long categoryId, Pageable pageable);
    }
    @Override
    public Page<Product> getProductsByCategoryId(Long categoryId, Pageable pageable) {
    return productRepository.findProductsByCategoryId(categoryId, pageable);
    }
}
