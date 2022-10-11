package com.doan.WedResManage.formatter;

import com.doan.WedResManage.pojo.CategoryDish;
import org.springframework.format.Formatter;

import java.text.ParseException;
import java.util.Locale;

public class CategoryDishFormatter implements Formatter<CategoryDish> {


    @Override
    public CategoryDish parse(String text, Locale locale) throws ParseException {
        CategoryDish categoryDish=new CategoryDish();
        categoryDish.setId(Integer.parseInt(text));
        return null;
    }

    @Override
    public String print(CategoryDish object, Locale locale) {
        return String.valueOf(object.getId());
    }
}
