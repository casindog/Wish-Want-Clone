class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.integer :user_id, null: false
      t.integer :product_id, null: false
      t.text :comment, null: false
      t.integer :rating 
      t.timestamps
    end

    add_index :reviews, :user_id
    add_index :reviews, :product_id

  end
end
