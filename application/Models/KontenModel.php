<?php namespace App\Models;

use CodeIgniter\Model;

class KontenModel extends Model{
    protected $table = 'data_konten_pelayanan';
    protected $primaryKey = 'id';
    protected $allowedFields = ['satuan_pelayanan','jenis_pelayanan','banner','konten','create_by','create_date'];
    protected $createdField  = 'create_date';

    public function getKegiatan($param = null, $role = null, $create_by = null, $update_by = null, $id = null)
    {
          return  $this->select(['data_kegiatan.*', 'users.user_id', 'users.user_name', 'users.user_email', 'users.user_role', 'users.user_fullname'])->join('users','users.user_id = data_kegiatan.create_by')->getWhere(['create_by' => $create_by])->getResult();
    }

    public function getSatuan()
    {
          $builder = $this->db->table('satuan');
          $query   = $builder->get();
          return  $query->getResult();
    }

    public function getSatuanByCode($code)
    {
          $builder = $this->db->table('satuan');
          $query   = $builder->getWhere(['satuan_code' => $code]);
          return  $query->getRow();
    }

    public function loadKegiatan($id)
    {
        $builder = $this->db->table('data_kegiatan');
        $query   = $builder->getWhere(['satuan' => $id]);
        return  $query->getResult();
    }

    public function loadBeritaHeadline($id)
    {
        $builder = $this->db->table('data_berita');
        $query   = $builder->getWhere(['satuan' => $id, 'status' => 1]);
        return  $query->getResult();
    }

    public function getKontenByid($id)
    {
        $builder = $this->db->table('data_konten_pelayanan');
        $query   = $builder->getWhere(['satuan_pelayanan' => $id]);
        return  $query->getResult();
    }

    public function getBeritaHeadline($id, $status)
    {
        $builder = $this->db->table('data_berita');
        $query   = $builder->getWhere(['id' => $id, 'status' => 1]);
        return  $query->getResult();
    }

    public function getBeritaCovid($id, $status)
    {
      $sql = "SELECT * FROM `data_berita_covid` cvd join users us on cvd.create_by = us.user_id  ORDER BY create_date asc";
      $result = $this->db->query($sql);
      $row = $result->getResult();
      return $row;
    }

    public function countStatus()
    {
      $sql = "SELECT COUNT(*) as Count FROM data_berita where status = 1";
      $result = $this->db->query($sql);
      $row = $result->getRow();
      return $row->Count;
    }

    public function getMaxId()
    {
      $sql = "SELECT * FROM `polres_sumedang`.`data_berita` ORDER BY create_date asc limit 1";
      $result = $this->db->query($sql);
      $row = $result->getRow();
      return $row->id;
    }

    public function getMaxIdCovid()
    {
      $sql = "SELECT * FROM `polres_sumedang`.`data_berita_covid` ORDER BY create_date asc limit 1";
      $result = $this->db->query($sql);
      $row = $result->getRow();
      return $row->id;
    }

    public function deleteData($id)
    {
        $builder = $this->db->table('data_berita');
        $query   = $builder->where('id', $id);
        return  $query->delete();
    }

    public function insertBeritaCovid($data)
    {
      $builder = $this->db->table('data_berita_covid');
      $query   = $builder->insert($data);;
      return  $this->db->insertID();
    }

    public function updateBeritaCovid($id, $data)
    {
      $builder = $this->db->table('data_berita_covid');
      $query   = $builder->where('id', $id);
      $query->update($data);
      return true;
    }

}
