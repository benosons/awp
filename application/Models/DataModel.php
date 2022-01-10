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

    public function updateJadwal($id, $data)
    {
      $builder = $this->db->table('data_jadwal');
      $query   = $builder->where('id', $id);
      $query->update($data);
      // echo $this->db->getLastQuery();die;

      return true;
    }

    public function delete($table = null, $id = null)
    {
        $builder = $this->db->table($table);
        $query   = $builder->where('id', $id);
        return  $query->delete();
    }

    public function deletelahan($id = null)
    {
        $builder = $this->db->table('data_lahan');
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

    public function getinstansi($param = null, $ids = null)
    {
      $builder = $this->db->table('data_instansi');
      $builder->select('
      `realisasi`.`id` as id_realisasi,
      `data_instansi`.`id_instansi`,
      `data_instansi`.`nama_instansi`,
      `komponen_instansi`.`id_komponen`,
      `komponen_instansi`.`nama_komponen`,
      `komponen_instansi`.`revisi_usd` as `dipa_rev_usd`,
      `komponen_instansi`.`revisi_idr` as `dipa_rev_idr`,
      `realisasi`.`usd` as `real_usd`,
      `realisasi`.`idr` as `real_idr`,
      `sisa_dipa`.`usd` as `sisa_usd`,
      `sisa_dipa`.`idr` as `sisa_idr`,
      `persen`.`usd` as `persen_usd`,
      `persen`.`idr` as `persen_idr`, 
      (select sum(replace(revisi_usd, ".", "")) from komponen_instansi ki where ki.id_instansi = data_instansi.id_instansi) as dipa_rev_total_usd, 
      (select sum(replace(revisi_idr, ".", "")) from komponen_instansi ki where ki.id_instansi = data_instansi.id_instansi) as dipa_rev_total_idr, 

      (select sum(replace(r1.usd, ".", "")) from realisasi r1 join komponen_instansi ki on ki.id_komponen = r1.id_komponen join data_instansi di on di.id_instansi = ki.id_instansi where di.id_instansi = data_instansi.id_instansi and r1.periode = '.$param.') as real_total_usd, 
      (select sum(replace(r1.idr, ".", "")) from realisasi r1 join komponen_instansi ki on ki.id_komponen = r1.id_komponen join data_instansi di on di.id_instansi = ki.id_instansi where di.id_instansi = data_instansi.id_instansi and r1.periode = '.$param.') as real_total_idr, 

      (select sum(replace(s.usd, ".", "")) from sisa_dipa s 
      join realisasi r on r.id = s.id_parent
      join komponen_instansi k on k.id_komponen = r.id_komponen
      join data_instansi d on d.id_instansi = k.id_instansi
      where d.id_instansi = data_instansi.id_instansi and r.periode = '.$param.') as sisa_total_usd, 

      (select sum(replace(s.idr, ".", "")) from sisa_dipa s 
      join realisasi r on r.id = s.id_parent
      join komponen_instansi k on k.id_komponen = r.id_komponen
      join data_instansi d on d.id_instansi = k.id_instansi

      where d.id_instansi = data_instansi.id_instansi and r.periode = '.$param.') as sisa_total_idr ');

      $builder->join('komponen_instansi', 'komponen_instansi.id_instansi = data_instansi.id_instansi');
      $builder->join('realisasi', 'realisasi.id_komponen = komponen_instansi.id_komponen');
      $builder->join('sisa_dipa', 'sisa_dipa.id_parent = realisasi.id');
      $builder->join('persen', 'persen.id_parent = realisasi.id');
      $builder->where('realisasi.periode', $param);
      $query = $builder->get();
      // echo $this->db->getLastQuery();die;
      return  $query->getResult();
    }

    public function getmonev_old($param = null, $ids = null)
    {
      $builder = $this->db->table('data_monev');
      $builder->select("data_monev.*,
      (select `kode` from data_aspek where type = 'aspek' and kode = data_monev.kode_aspek) as nomor_aspek,
      (select `desc` from data_aspek where type = 'aspek' and kode = data_monev.kode_aspek) as desc_aspek,
      (select `desc` from data_aspek where type = 'indikator' and kode = data_monev.kode_indikator) as desc_indikator,
      (select `desc` from data_aspek where type = 'parameter' and kode = data_monev.kode_parameter) as desc_parameter

      ");
      // $builder->where('realisasi.periode', $param);
      $builder->orderBy('kode_aspek ASC');
      $query = $builder->get();
      // echo $this->db->getLastQuery();die;
      return  $query->getResult();
    }

    public function getmonev($param = null, $ids = null, $periode = null)
    {
      $builder = $this->db->table('data_monev');
      if($param){
        $builder->where(['kota' => $param, 'periode' => $periode]);
      }
      $builder->orderBy('kode_aspek ASC');
      $query = $builder->get();
      // echo $this->db->getLastQuery();die;
      return  $query->getResult();
    }

    public function getlahan($param = null, $ids = null, $periode = null)
    {
      $builder = $this->db->table('data_lahan');
      if($param){
        $builder->where(['kota' => $param, 'periode' => $periode]);
      }
      $builder->orderBy('id ASC');
      $query = $builder->get();
      // echo $this->db->getLastQuery();die;
      return  $query->getResult();
    }

    public function getinformasi($param = null, $ids = null, $periode = null)
    {
      $builder = $this->db->table('data_informasi_umum');
      if($param){
        $builder->where(['kota' => $param, 'periode' => $periode]);
      }
      $builder->orderBy('kode ASC');
      $query = $builder->get();
      // echo $this->db->getLastQuery();die;
      return  $query->getResult();
    }

    // public function getinstansi($table = null, $ids = null)
    // {
    //   $builder = $this->db->table('data_instansi');
    //   $builder->select('data_instansi.id_instansi, data_instansi.nama_instansi, komponen_instansi.id_komponen, komponen_instansi.nama_komponen, komponen_instansi.revisi_usd as dipa_rev_usd, komponen_instansi.revisi_idr as diva_rev_idr, komponen_instansi.realisasi_usd as real_usd, komponen_instansi.realisasi_idr as real_idr, komponen_instansi.sisa_usd as sisa_usd, komponen_instansi.sisa_idr as sisa_idr, komponen_instansi.persen_usd as persen_usd, komponen_instansi.persen_idr as persen_idr, 
    //   (select sum(revisi_usd) from komponen_instansi where id_instansi = data_instansi.id_instansi ) as dipa_rev_total_usd,
    //   (select sum(revisi_idr) from komponen_instansi where id_instansi = data_instansi.id_instansi ) as dipa_rev_total_idr,
    //   (select sum(realisasi_usd) from komponen_instansi where id_instansi = data_instansi.id_instansi ) as real_total_usd,
    //   (select sum(realisasi_idr) from komponen_instansi where id_instansi = data_instansi.id_instansi ) as real_total_idr,
    //   (select sum(sisa_usd) from komponen_instansi where id_instansi = data_instansi.id_instansi ) as sisa_total_usd,
    //   (select sum(sisa_idr) from komponen_instansi where id_instansi = data_instansi.id_instansi ) as sisa_total_idr ');
    //   $builder->join('komponen_instansi', 'komponen_instansi.id_instansi = data_instansi.id_instansi');
    //   $query = $builder->get();
    //   // echo $this->db->getLastQuery();die;
    //   return  $query->getResult();
    // }

    public function getKomponen($code = null)
    {
          $builder = $this->db->table('komponen_instansi');
          $query   = $builder->getWhere(['id_komponen' => $code]);
          
          return  $query->getResult();
    }

    public function cekperiode($param = null)
    {
          $builder = $this->db->table('realisasi');
          $query   = $builder->getWhere(['periode' => $param]);
          
          return  $query->getResult();
    }

    public function loadperiode()
    {
          $builder = $this->db->table('realisasi');
          $builder->select('periode');
          $query   = $builder->groupBy("periode")->get();
          // echo $this->db->getLastQuery();die;
          
          return  $query->getResult();
    }

    public function loadjadwal()
    {
          $builder = $this->db->table('data_jadwal');
          $query   = $builder->get();
          // echo $this->db->getLastQuery();die;
          
          return  $query->getResult();
    }

    public function getsoe($param = null, $ids = null)
    {
      $builder = $this->db->table('soe_komponen ko');
      $builder->select('
      ko.id,
      ko.name as nama_komponen, 
      ka.code,
      ka.name as nama_kategori, 
      ka.amount, 
      di.disbursed_value, 
      di.disbursed_persen, 
      di.undisbursed_value, 
      di.undisbursed_persen,
      ka.remark');

      $builder->join('soe_kategori ka', 'ka.id_parent = ko.id');
      $builder->join('soe_disbursed di', 'di.id_parent = ka.id');

      $query = $builder->get();
      // echo $this->db->getLastQuery();die;
      return  $query->getResult();
    }

    public function updateRealisasi($table, $param, $id, $data)
    {

      
      $builder = $this->db->table($table);
      $query   = $builder->where($param, $id);
      $query->update($data);
      // echo $this->db->getLastQuery();die;
      return true;
    }

    public function getaspek($param, $value)
    {
          $builder = $this->db->table('data_aspek');
          
          if($value){
            
            $query   = $builder->getWhere(['type' => $param, 'kode_parent' => $value]);
          }else{
            $query = $builder->getWhere(['type' => $param]);
          }
          
          return  $query->getResult();
    }

    public function getpelelangan($param, $value)
    {
      $builder = $this->db->table('data_pelelangan');
      $query   = $builder->get();
      // echo $this->db->getLastQuery();die;
      
      return  $query->getResult();
    }

    public function cekmonev($kode, $kode_parent)
    {
          $builder = $this->db->table('data_monev');
          $query   = $builder->getWhere(['kode_aspek' => $kode_parent]);
          $query   = $builder->getWhere(['kode_indikator' => $kode]);
          
          return  $query->getResult();
    }

    public function updateMonev($id, $data)
    {
      
      $builder = $this->db->table('data_monev');
      $query   = $builder->where('id', $id);
      $query->update($data);
      // echo $this->db->getLastQuery();die;

      return true;
    }

    public function updateLahan($id, $data)
    {
      
      $builder = $this->db->table('data_lahan');
      $query   = $builder->where('id', $id);
      $query->update($data);
      // echo $this->db->getLastQuery();die;

      return true;
    }

    public function updatepelelangan($id, $data)
    {
      
      $builder = $this->db->table('data_pelelangan');
      $query   = $builder->where('id', $id);
      $query->update($data);
      // echo $this->db->getLastQuery();die;

      return true;
    }

    public function updateInformasi($id, $data)
    {
      
      $builder = $this->db->table('data_informasi_umum');
      $query   = $builder->where('id', $id);
      $query->update($data);
      // echo $this->db->getLastQuery();die;

      return true;
    }

}
