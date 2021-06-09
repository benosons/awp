<?php namespace App\Models;

use CodeIgniter\Model;

class DataModel extends Model{

    public function getData($table = null, $ids = null)
    {

          if($table == 'data_program'){
            $builder = $this->db->table($table);
            $builder->select('data_program.*, data_komponen.nama_komponen, data_komponen.komponen_ke ');
            $builder->join('data_komponen', 'data_komponen.id = data_program.id_komponen');

            if($ids){
              $builder->where('id_komponen', $ids);
            }
            $query = $builder->get();
            return  $query->getResult();
          }else if($table == 'data_kegiatan'){
            $builder = $this->db->table($table);
            $builder->select('data_kegiatan.*,
                              data_komponen.id as id_komponen,
                              data_komponen.nama_komponen,
                              data_komponen.komponen_ke,
                              data_program.id as id_program,
                              data_program.nama_program,
                              data_pelaksana.nama_pelaksana,
                              data_pelaksana.id as id_pelaksana');
            $builder->join('data_pelaksana', 'data_pelaksana.id = data_kegiatan.id_pelaksana');
            $builder->join('data_program', 'data_program.id = data_kegiatan.id_program');
            $builder->join('data_komponen', 'data_komponen.id = data_program.id_komponen');

            if($ids){
              $builder->where('id', $ids);
            }
            $query = $builder->get();
              // echo $this->db->getLastQuery();
            return  $query->getResult();
          }

          $builder = $this->db->table($table);
          $query   = $builder->get();
          return  $query->getResult();
    }

    public function saveData($table = null, $data = null)
    {
        return  $this->db->table($table)->insert($data);
    }

    public function update($id, $data)
    {
      $builder = $this->db->table('users');
      $query   = $builder->where('user_id', $id);
      $query->update($data);
      // echo $this->db->getLastQuery();

      return true;
    }

    public function delete($table = null, $id = null)
    {
        $builder = $this->db->table($table);
        $query   = $builder->where('id', $id);
        return  $query->delete();
    }

    public function updateData($id, $data)
    {
      $builder = $this->db->table('data');
      $query   = $builder->where('param', $id);
      $query->update($data);
      // echo $this->db->getLastQuery();

      return true;
    }

}
