const Category = require(`${config.path.models}/Category`);
const {json} = require("express");

class CategoryControllers {
    async create(req,res){
        try {
            const {title,mother} = req.body;
            // Check Category Exists
            const categoryExist = await  Category.findOne({title});
            if(categoryExist){
                return  res.status(422).json({
                    success: false,
                    message:"دسته بندی مورد نظر وجود دارد",
                })
            }

            const newCategory = new Category({
                title,mother
            });

            const category = await  newCategory.save();

            res.status(200).json({
                success: true,
                message:"دسته بندی مورد ایجاد شد",
                category
            })



        }catch (error){
            console.log(error)
            return res.status(500).json({
                success: false,
                message:"Internal Error in Server"
            })
        }
    }
}



module.exports = new CategoryControllers();