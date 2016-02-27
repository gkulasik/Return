class CreateScores < ActiveRecord::Migration
  def change
    create_table :scores do |t|
      t.integer :turns
      t.integer :food
      t.integer :water
      t.integer :ore
      t.integer :units
      t.integer :reserve
      t.string :unit_reserve_generation
      t.string :integer

      t.timestamps null: false
    end
  end
end
