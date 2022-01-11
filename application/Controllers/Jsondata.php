<?php namespace App\Controllers;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\Files\UploadedFile;

class Jsondata extends \CodeIgniter\Controller
{
	protected $session;
	protected $request;

  function __construct(RequestInterface $request)
  {
      $this->session = session();
			$this->now = date('Y-m-d H:i:s');
			$this->request = $request;
      $this->logged = $this->session->get('logged_in');
			$this->data = array(
				'version' => \CodeIgniter\CodeIgniter::CI_VERSION,
				'baseURL' => BASE.'/public',
				// 'baseURL' => BASE,
				'userid' => $this->session->get('user_id'),
				'username' => $this->session->get('user_name'),
				'role' => $this->session->get('user_role'),
				'satuan' => $this->session->get('user_satuan'),
				'nip' => $this->session->get('nip'),
			);
  }

	public function getpengaduan()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];
				$user_satuan		= $this->data['satuan'];

				if($this->logged){
					$model = new \App\Models\PengaduanModel();
					$modelfiles = new \App\Models\FilesModel();
					if($role == 100){
						$data = $model->findAll();
					}else{
							$data['pengaduan'] = $model->getPengaduan($param, $role, $userid, '', $id, $user_satuan);
							$data['lampiran']  = $modelfiles->getWhere(['id_parent' => $id])->getResult();
							$data['balasan']   = $model->getBalasan($id);
							foreach ($data['balasan'] as $key => $value) {
								unset($value->user_password);
								unset($value->user_created_at);
								unset($value->user_id);
							}

					}

					if($data){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $data
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				}else{
					$response = [
							'status'   => 'gagal',
							'code'     => '0',
							'data' 		 => 'silahkan login'
					];
				}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function getBerita()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];
				$user_satuan		= $this->data['satuan'];

				if($this->logged){
					$model = new \App\Models\BeritaModel();
					$modelfiles = new \App\Models\FilesModel();
					if($role == 100){
							$data['berita'] = $model->join('users','users.user_id = data_berita.create_by')->findAll();
					}else{
							$data['berita'] = $model->getBerita($param, $role, $userid, '', $id);
							$data['lampiran']  = $modelfiles->getWhere(['id_parent' => $id])->getResult();
					}

					if($data){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $data
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				}else{
					$response = [
							'status'   => 'gagal',
							'code'     => '0',
							'data' 		 => 'silahkan login'
					];
				}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function getKegiatan()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];

				if($this->logged){
					$model = new \App\Models\KegiatanModel();
					$modelfiles = new \App\Models\FilesModel();

					$data = $model->getKegiatan($param, $role, $userid, '', $id);

					foreach ($data as $key => $value) {
						$data[$key]->lampiran  = $modelfiles->getWhere(['id_parent' => $value->id])->getResult();
					}

					if($data){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $data
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				}else{
					$response = [
							'status'   => 'gagal',
							'code'     => '0',
							'data' 		 => 'silahkan login'
					];
				}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function getFiles()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];

				if($this->logged){
					$model = new \App\Models\KegiatanModel();
					$modelfiles = new \App\Models\FilesModel();

					$data = $modelfiles->getWhere(['id_parent' => $param['id']])->getResult();

					if($data){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $data
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				}else{
					$response = [
							'status'   => 'gagal',
							'code'     => '0',
							'data' 		 => 'silahkan login'
					];
				}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function getBeritaCovid()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];

				if($this->logged){
					$model = new \App\Models\BeritaModel();
					$modelfiles = new \App\Models\FilesModel();
					// if($role == 100){
					// 		$data['berita'] = $model->join('users','users.user_id = data_berita.create_by')->findAll();
					// }else{
							$data = $model->getBeritaCovid($param, $role, $userid, '', $id);
							foreach ($data as $key => $value) {
								$data[$key]->lampiran  = $modelfiles->getWhere(['id_parent' => $value->id])->getResult();
							}
					// }

					if($data){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $data
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				}else{
					$response = [
							'status'   => 'gagal',
							'code'     => '0',
							'data' 		 => 'silahkan login'
					];
				}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function getLaporCovid()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];

				if($this->logged){
					$model = new \App\Models\PengaduanModel();
					$modelfiles = new \App\Models\FilesModel();
					// if($role == 100){
					// 		$data['berita'] = $model->join('users','users.user_id = data_berita.create_by')->findAll();
					// }else{
							$data = $model->getLaporCovid($param, $role, $userid, '', $id);
							foreach ($data as $key => $value) {
								$data[$key]->lampiran  = $modelfiles->getWhere(['id_parent' => $value->id])->getResult();
							}
					// }

					if($data){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $data
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				}else{
					$response = [
							'status'   => 'gagal',
							'code'     => '0',
							'data' 		 => 'silahkan login'
					];
				}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function loadprogram()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];

					$model = new \App\Models\ProgramModel();
					$modelparam = new \App\Models\ParamModel();
					$modelfiles = new \App\Models\FilesModel();

						$fulldata = [];
						$dataprogram = $model->getProgram($id);

					if($dataprogram){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $dataprogram
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function loadkegiatan()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];
				$code 		= $request->getVar('code');

					$model = new \App\Models\KegiatanModel();
					$modelparam = new \App\Models\ParamModel();
					$modelfiles = new \App\Models\FilesModel();

						$fulldata = [];
						$datakegiatan = $model->getKegiatan($code);

					if($datakegiatan){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $datakegiatan
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function loadsubkegiatan()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];
				$code 		= $request->getVar('code');

					$model = new \App\Models\KegiatanModel();
					$modelparam = new \App\Models\ParamModel();
					$modelfiles = new \App\Models\FilesModel();

						$fulldata = [];
						$datakegiatan = $model->getsubKegiatan($code);

					if($datakegiatan){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $datakegiatan
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function loadpaket()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];
				$code 		= $request->getVar('code');

					$model = new \App\Models\KegiatanModel();
					$modelparam = new \App\Models\ParamModel();
					$modelfiles = new \App\Models\FilesModel();

						$fulldata = [];
						$datapaket = $model->getpaket($code);

					if($datapaket){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $datapaket
						];
					}else{
						$response = [
								'status'   => 'gagal',
								'code'     => '0',
								'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function loadtarget()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];
				$code 		= $request->getVar('code');

					$model = new \App\Models\TargetModel();
					$modelparam = new \App\Models\ParamModel();
					$modelfiles = new \App\Models\FilesModel();

					$fulldata = [];
					$datapaket = $model->gettarget($code);

					if($datapaket){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $datapaket
						];
					}else{
						$response = [
								'status'   => 'gagal',
								'code'     => '0',
								'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function loadtargetNip()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];
				$code 		= $request->getVar('code');

					$model = new \App\Models\TargetModel();
					$modelparam = new \App\Models\ParamModel();
					$modelfiles = new \App\Models\FilesModel();

					$fulldata = [];
					$datapaket = $model->gettargetNip($code);
					$datareal = [];
					$bulan = [];
					$newreal = [];
					foreach ($datapaket as $key => $value) {

						if($value->type == 'fisik'){
							$datareal['n1'] = $model->getrealisasi($value->id_paket, $value->ppk, $value->type, 'n1');
							$datareal['n2'] = $model->getrealisasi($value->id_paket, $value->ppk, $value->type, 'n2');
							$datareal['n3'] = $model->getrealisasi($value->id_paket, $value->ppk, $value->type, 'n3');
							$datareal['n4'] = $model->getrealisasi($value->id_paket, $value->ppk, $value->type, 'n4');
							$datareal['n5'] = $model->getrealisasi($value->id_paket, $value->ppk, $value->type, 'n5');
							$datareal['n6'] = $model->getrealisasi($value->id_paket, $value->ppk, $value->type, 'n6');
							$datareal['n7'] = $model->getrealisasi($value->id_paket, $value->ppk, $value->type, 'n7');
							$datareal['n8'] = $model->getrealisasi($value->id_paket, $value->ppk, $value->type, 'n8');
							$datareal['n9'] = $model->getrealisasi($value->id_paket, $value->ppk, $value->type, 'n9');
							$datareal['n10'] = $model->getrealisasi($value->id_paket, $value->ppk, $value->type, 'n10');
							$datareal['n11'] = $model->getrealisasi($value->id_paket, $value->ppk, $value->type, 'n11');
							$datareal['n12'] = $model->getrealisasi($value->id_paket, $value->ppk, $value->type, 'n12');
							$datapaket[$key]->progres = $datareal;
						}

					}


					if($datapaket){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $datapaket
						];
					}else{
						$response = [
								'status'   => 'gagal',
								'code'     => '0',
								'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function loadminggu()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];
				$code 		= $request->getVar('code');

					$model = new \App\Models\TargetModel();
					$modelparam = new \App\Models\ParamModel();
					$modelfiles = new \App\Models\FilesModel();

					$fulldata = [];
					$datapaket = $model->getminggu($code);

					if($datapaket){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $datapaket
						];
					}else{
						$response = [
								'status'   => 'gagal',
								'code'     => '0',
								'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function loadlahan()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$periode		 	  = $request->getVar('periode');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];
				
					$model = new \App\Models\DataModel();
					$modelfiles = new \App\Models\FilesModel();

					$data = $model->getlahan($param, $id, $periode);

					if($data){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		=> $data
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function loadnip()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];
				$code 		= $request->getVar('code');

					$model = new \App\Models\TargetModel();
					$modelparam = new \App\Models\ParamModel();
					$modelfiles = new \App\Models\FilesModel();

					$fulldata = [];
					$datapaket = $model->getnip($code);

					if($datapaket){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $datapaket
						];
					}else{
						$response = [
								'status'   => 'gagal',
								'code'     => '0',
								'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function loadrealisasi()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];
				$nip			= $this->data['nip'];
				$code 		= $request->getVar('code');

					$model = new \App\Models\TargetModel();
					$modelparam = new \App\Models\ParamModel();
					$modelfiles = new \App\Models\FilesModel();

					$fulldata = [];
					$datapaket = $model->gettarget($code);

					if($datapaket){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $datapaket
						];
					}else{
						$response = [
								'status'   => 'gagal',
								'code'     => '0',
								'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function loadBeritaCovid()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];

					$model = new \App\Models\BeritaModel();
					$modelparam = new \App\Models\ParamModel();
					$modelfiles = new \App\Models\FilesModel();

					if($param == 'post'){
						$fulldata = [];
						$databerita = $model->getBeritaByidCovid($id);

						foreach ($databerita as $keyberita => $valueberita) {

							$datafiles = $modelfiles->getWhere(['id_parent' => $valueberita->id])->getResult();
							$datasatuan= $model->getSatuanByCode($valueberita->satuan);
							$obj_merged = (object) array_merge((array) $valueberita, (array) $datafiles[0], (array) $datasatuan);
							array_push($fulldata, $obj_merged);
						}
						$berita = $fulldata;
					}else{
							if($param && $id){
								$data = $modelparam->getparam($param, $id);
							}else{
								$data = $model->getSatuan();
							}

							$berita = [];
							foreach ($data as $key => $value) {
								$fulldata = [];
								$databerita = $model->loadBeritaCovid($value->satuan_code);
								foreach ($databerita as $keyberita => $valueberita) {
									$datafiles = $modelfiles->getWhere(['id_parent' => $valueberita->id])->getResult();
									$obj_merged = (object) array_merge((array) $valueberita);
									$obj_merged->lampiran = (array) $datafiles;
									array_push($fulldata, $obj_merged);
								}
								$berita = $fulldata;
							}
						}

					if($berita){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $berita
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function loadKegiatan_pol()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];

					$model = new \App\Models\KegiatanModel();
					$modelparam = new \App\Models\ParamModel();
					$modelfiles = new \App\Models\FilesModel();

					if($param == 'post'){
						$fulldata = [];
						$databerita = $model->getKegiatanByid($id);
						foreach ($databerita as $keyberita => $valueberita) {

							$datafiles = $modelfiles->getWhere(['id_parent' => $valueberita->id])->getResult();
							$datasatuan= $model->getSatuanByCode($valueberita->satuan);
							$obj_merged = (object) array_merge((array) $valueberita, (array) $datasatuan);
							$obj_merged->lampiran = (array) $datafiles;
							array_push($fulldata, $obj_merged);
						}
						$berita = $fulldata;
					}else{
							if($param && $id){
								$data = $modelparam->getparam($param, $id);
							}else{
								$data = $model->getSatuan();
							}

							$berita = [];
							foreach ($data as $key => $value) {
								$fulldata = [];
								$databerita = $model->loadKegiatan($value->satuan_code);
								foreach ($databerita as $keyberita => $valueberita) {
									$datafiles = $modelfiles->getWhere(['id_parent' => $valueberita->id])->getRow();
									$obj_merged = (object) array_merge((array) $valueberita, (array) $datafiles);
									array_push($fulldata, $obj_merged);
								}
								$berita[$value->satuan_name] = $fulldata;
							}
						}

					if($berita){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $berita
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function loadBeritaHeadline()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];

					$model = new \App\Models\BeritaModel();
					$modelparam = new \App\Models\ParamModel();
					$modelfiles = new \App\Models\FilesModel();

					if($param == 'post'){
						$fulldata = [];
						$databerita = $model->getBeritaHeadline($id, 1);

						foreach ($databerita as $keyberita => $valueberita) {

							$datafiles = $modelfiles->getWhere(['id_parent' => $valueberita->id])->getRow();
							$datasatuan= $model->getSatuanByCode($valueberita->satuan);
							$obj_merged = (object) array_merge((array) $valueberita, (array) $datafiles, (array) $datasatuan);
							array_push($fulldata, $obj_merged);
						}
						$berita = $fulldata;
					}else{
							if($param && $id){
								$data = $modelparam->getparam($param, $id);
							}else{
								$data = $model->getSatuan();
							}

							$berita = [];
							foreach ($data as $key => $value) {
								$fulldata = [];
								$databerita = $model->loadBeritaHeadline($value->satuan_code);
								foreach ($databerita as $keyberita => $valueberita) {
									$datafiles = $modelfiles->getWhere(['id_parent' => $valueberita->id])->getRow();
									$obj_merged = (object) array_merge((array) $valueberita, (array) $datafiles);
									array_push($fulldata, $obj_merged);
								}
								$berita[$value->satuan_name] = $fulldata;
							}
						}

					if($berita){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $berita
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function loadBeritaHeadlineCovid()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];

					$model = new \App\Models\BeritaModel();
					$modelparam = new \App\Models\ParamModel();
					$modelfiles = new \App\Models\FilesModel();

					if($param == 'post'){
						$fulldata = [];
						$databerita = $model->getBeritaHeadlineCovid($id, 1);

						foreach ($databerita as $keyberita => $valueberita) {

							$datafiles = $modelfiles->getWhere(['id_parent' => $valueberita->id])->getRow();
							$datasatuan= $model->getSatuanByCode($valueberita->satuan);
							$obj_merged = (object) array_merge((array) $valueberita, (array) $datafiles, (array) $datasatuan);
							array_push($fulldata, $obj_merged);
						}
						$berita = $fulldata;
					}else{
							if($param && $id){
								$data = $modelparam->getparam($param, $id);
							}else{
								$data = $model->getSatuan();
							}

							$berita = [];
							foreach ($data as $key => $value) {
								$fulldata = [];
								$databerita = $model->loadBeritaHeadlineCovid($value->satuan_code);

								foreach ($databerita as $keyberita => $valueberita) {
									$datafiles = $modelfiles->getWhere(['id_parent' => $valueberita->id])->getRow();
									$obj_merged = (object) array_merge((array) $valueberita, (array) $datafiles);
									array_push($fulldata, $obj_merged);
								}
								$berita = $fulldata;
							}
						}

					if($berita){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $berita
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function loadparam()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];

					$model = new \App\Models\ParamModel();
					$modelfiles = new \App\Models\FilesModel();

					$data = $model->getparam($param, $id);

					if($data){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $data
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function save(){

		$request  = $this->request;
		$param 	  = $request->getVar('param');
		$mode 	  = $request->getVar('mode');
		$model 	  = new \App\Models\PengaduanModel();
		$modelfiles = new \App\Models\FilesModel();

		if($mode == 'balasan'){
			$data = [
				'id_pengaduan'=> $request->getVar('id'),
				'isi' 				=> $request->getVar('isi'),
				'create_date' => $this->now,
				'update_date' => $this->now,
				'create_by' 	=> $this->data['userid']
	    ];

			$simpan = $model->saveBalasan($data);
			$response = [
					'status'   => 'sukses',
					'code'     => '0',
					'data' 		 => 'terkirim'
			];
			header('Content-Type: application/json');
			echo json_encode($response);
			exit;
		}

		$files	  = $request->getFiles()['lampiran'];
		$path			= FCPATH.'public';
		$tipe			= 'uploads/users/'.$request->getVar('param').'/lampiran';
		$bagian 	= $request->getVar('nama_tujuan');
		$date 		= date('Y/m/d');
		$folder		= $path.'/'.$tipe.'/'.$bagian.'/'.$date.'/';

		$data = [
						'kode_tujuan' => $request->getVar('kode_tujuan'),
						'nama_tujuan'	=> $request->getVar('nama_tujuan'),
						'judul' 			=> $request->getVar('judul'),
						'isi' 				=> $request->getVar('isi'),
						'create_date' => $this->now,
						'update_date' => $this->now,
						'create_by' 	=> $this->data['userid'],
						'update_by' 	=> '',
						'status' 			=> 0,
						'role' 				=> $this->data['role']
        ];
		$res = $model->insert($data);
		$id  = $model->insertID();

		if (!is_dir($folder)) {
		    mkdir($folder, 0777, TRUE);
		}

		if($id){
			foreach($files as $idx => $img){

				$stat = $img->move($folder, $img->getName());

				$datalampiran = [
					'id_parent' => $id,
					'file_name' => $img->getName(),
					'extention' => null,
					'size' => $img->getSize('kb'),
					'path' => $tipe.'/'.$bagian.'/'.$date.'/',
					'type' => $request->getVar('param'),
					'create_date' => $this->now,
					'update_date' => $this->now,
		    ];
				$modelfiles->insert($datalampiran);
				// $saveupload = $model->saveDataUpload($datalampiran);
			}
		}

		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terkirim'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function saveBerita(){

		$request  = $this->request;
		$param 	  = $request->getVar('param');
		$mode 	  = $request->getVar('mode');
		$model 	  = new \App\Models\BeritaModel();
		$modelfiles = new \App\Models\FilesModel();

		$files	  = $request->getFiles()['lampiran'];
		$path			= FCPATH.'public';
		$tipe			= 'uploads/users/'.$request->getVar('param').'/lampiran';
		$bagian 	= $request->getVar('nama_tujuan');
		$date 		= date('Y/m/d');
		$folder		= $path.'/'.$tipe.'/'.$bagian.'/'.$date.'/';

		$data = [
			'judul_berita' => $request->getVar('judul'),
			'isi_berita' => $request->getVar('isi'),
			'satuan' => $request->getVar('kode_tujuan'),
			'create_by' => $this->data['userid'],
			'status' => 0,
			'create_date' => $this->now,
			'update_date' => $this->now
    ];

		$res = $model->insert($data);
		$id  = $model->insertID();

		if (!is_dir($folder)) {
		    mkdir($folder, 0777, TRUE);
		}

		if($id){
			foreach($files as $idx => $img){

				$stat = $img->move($folder, $img->getName());

				$datalampiran = [
					'id_parent' => $id,
					'file_name' => $img->getName(),
					'extention' => null,
					'size' => $img->getSize('kb'),
					'path' => $tipe.'/'.$bagian.'/'.$date.'/',
					'type' => $request->getVar('param'),
					'create_date' => $this->now,
					'update_date' => $this->now,
		    ];
				$modelfiles->insert($datalampiran);
				// $saveupload = $model->saveDataUpload($datalampiran);
			}
		}

		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terkirim'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function saveKegiatan(){

		$request  = $this->request;
		$param 	  = $request->getVar('param');
		$mode 	  = $request->getVar('mode');
		$model 	  = new \App\Models\KegiatanModel();
		$modelfiles = new \App\Models\FilesModel();

		$files	  = $request->getFiles()['lampiran'];
		$path			= FCPATH.'public';
		$tipe			= 'uploads/users/'.$request->getVar('param').'/lampiran';
		$bagian 	= $request->getVar('nama_tujuan');
		$date 		= date('Y/m/d');
		$folder		= $path.'/'.$tipe.'/'.$bagian.'/'.$date.'/';

		$data = [
			'judul_kegiatan' => $request->getVar('judul'),
			'satuan' => $request->getVar('kode_tujuan'),
			'create_by' => $this->data['userid'],
			'status' => 0,
			'create_date' => $this->now,
			'update_date' => $this->now
    ];

		$res = $model->insert($data);
		$id  = $model->insertID();

		if (!is_dir($folder)) {
		    mkdir($folder, 0777, TRUE);
		}

		if($id){
			foreach($files as $idx => $img){

				$stat = $img->move($folder, $img->getName());

				$datalampiran = [
					'id_parent' => $id,
					'file_name' => $img->getName(),
					'extention' => null,
					'size' => $img->getSize('kb'),
					'path' => $tipe.'/'.$bagian.'/'.$date.'/',
					'type' => $request->getVar('param'),
					'create_date' => $this->now,
					'update_date' => $this->now,
		    ];
				$modelfiles->insert($datalampiran);
				// $saveupload = $model->saveDataUpload($datalampiran);
			}
		}

		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terkirim'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function saveBeritaCovid(){

		$request  = $this->request;
		$param 	  = $request->getVar('param');
		$mode 	  = $request->getVar('mode');
		$model 	  = new \App\Models\BeritaModel();
		$modelfiles = new \App\Models\FilesModel();

		$files	  = $request->getFiles()['lampiran'];
		$path			= FCPATH.'public';
		$tipe			= 'uploads/users/'.$request->getVar('param').'/lampiran';
		$bagian 	= 'covid';
		$date 		= date('Y/m/d');
		$folder		= $path.'/'.$tipe.'/'.$bagian.'/'.$date.'/';

		$data = [
			'judul_berita' => $request->getVar('judul'),
			'isi_berita' => $request->getVar('isi'),
			'create_by' => $this->data['userid'],
			'status' => 0,
			'create_date' => $this->now,
			'update_date' => $this->now
    ];

		$res = $model->insertBeritaCovid($data);
		$id  = $res;

		if (!is_dir($folder)) {
		    mkdir($folder, 0777, TRUE);
		}

		if($id){
			foreach($files as $idx => $img){

				$stat = $img->move($folder, $img->getName());

				$datalampiran = [
					'id_parent' => $id,
					'file_name' => $img->getName(),
					'extention' => null,
					'size' => $img->getSize('kb'),
					'path' => $tipe.'/'.$bagian.'/'.$date.'/',
					'type' => $request->getVar('param'),
					'create_date' => $this->now,
					'update_date' => $this->now,
		    ];
				$modelfiles->insert($datalampiran);
				// $saveupload = $model->saveDataUpload($datalampiran);
			}
		}

		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terkirim'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function saveLapor(){
		$request  = $this->request;
		$param 	  = $request->getVar('param');
		$mode 	  = $request->getVar('mode');
		$model 	  = new \App\Models\PengaduanModel();
		$modelfiles = new \App\Models\FilesModel();

		$files	  = $request->getFiles()['lampiran'];
		$path			= FCPATH.'public';
		$tipe			= 'uploads/users/'.$request->getVar('param').'/lampiran';
		$bagian 	= 'covid';
		$date 		= date('Y/m/d');
		$folder		= $path.'/'.$tipe.'/'.$bagian.'/'.$date.'/';

		$data = [
			'nama' => $request->getVar('input-name'),
			'no_telepon' => $request->getVar('input-notelp'),
			'alamat' => $request->getVar('input-alamat'),
			'id_kecamatan' => $request->getVar('input-kecamatan'),
			'id_desa' => $request->getVar('input-desa'),
			'create_date' => $this->now
    ];

		$res = $model->saveLaporan($data);
		$id  = $res;

		if (!is_dir($folder)) {
		    mkdir($folder, 0777, TRUE);
		}

		if($id){
			foreach($files as $idx => $img){

				$stat = $img->move($folder, $img->getName());

				$datalampiran = [
					'id_parent' => $id,
					'file_name' => $img->getName(),
					'extention' => null,
					'size' => $img->getSize('kb'),
					'path' => $tipe.'/'.$bagian.'/'.$date.'/',
					'type' => 'kerumunan',
					'create_date' => $this->now,
					'update_date' => $this->now,
		    ];
				$modelfiles->insert($datalampiran);
				// $saveupload = $model->saveDataUpload($datalampiran);
			}
		}

		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terkirim'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function updateData(){

		$request  = $this->request;
		$id 	  = $request->getVar('id_param');
		$role 		= $this->data['role'];
		$userid		= $this->data['userid'];

		$model 	  = new \App\Models\DataModel();

		$data = [
						'updated_date'=> $this->now,
						'updated_by' 	=> $userid,
        ];

		if($request->getVar('value')){
			$data['value'] = $request->getVar('value');
		}

		if($request->getVar('note')){
			$data['note'] = $request->getVar('note');
		}
		
		$res = $model->updateData($id, $data);

		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terupdate'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function addData(){

		$request  = $this->request;
		$param 	  = $request->getVar('param');
		$userid		= $this->data['userid'];
		$role 		= $this->data['role'];

		$model 	  = new \App\Models\DataModel();

		if($param == 'data_pelaksana'){
			$data = [
				'nama_pelaksana' => $request->getVar('nama_pelaksana'),
				'created_by'	 => $userid,
				'created_date' => $this->now,
				'updated_date' => $this->now
			];

		}else if($param == 'data_komponen'){
			$data = [
				'komponen_ke' => $request->getVar('komponen_ke'),
				'nama_komponen' => $request->getVar('nama_komponen'),
				'created_by'	 => $userid,
				'created_date' => $this->now,
				'updated_date' => $this->now
			];
		}else if($param == 'data_program'){
			$data = [
				'id_komponen' => $request->getVar('id_komponen'),
				'nama_program' => $request->getVar('nama_program'),
				'created_by'	 => $userid,
				'created_date' => $this->now,
				'updated_date' => $this->now
			];
		}else if($param == 'data_kegiatan'){
			$data = [
				'id_program' => $request->getVar('id_program'),
				'nama_kegiatan' => $request->getVar('nama_kegiatan'),
				'id_pelaksana' => $request->getVar('id_pelaksana'),
				'value' => $request->getVar('value'),
				'created_by'	 => $userid,
				'created_date' => $this->now,
				'updated_date' => $this->now
			];
		}

		$res = $model->saveData($param, $data);
		$id  = $model->insertID();

		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terkirim'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function loaddata()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];
				
					$model = new \App\Models\DataModel();
					$modelfiles = new \App\Models\FilesModel();

					$data = $model->getData($param, $id);

					if($data){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $data
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function loadaspek()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$kode		 	  = $request->getVar('kode');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];
				
					$model = new \App\Models\DataModel();
					$modelfiles = new \App\Models\FilesModel();
					
					$data = $model->getaspek($param, $kode);
					$newdata = [];
					foreach ($data as $key => $value) {
						$monev = $model->cekmonev($value->kode, $value->kode_parent);
						if(empty($monev)){
							array_push($newdata, $value);
						}
					}

					// print_r($newdata);die;

					if($newdata){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $newdata
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function loadpelelangan()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$kode		 	  = $request->getVar('kode');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];
				
					$model = new \App\Models\DataModel();
					$modelfiles = new \App\Models\FilesModel();
					
					$data = $model->getpelelangan($param, $kode);

					if($data){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $data
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function loadinstansi()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];
				
					$model = new \App\Models\DataModel();
					$modelfiles = new \App\Models\FilesModel();

					$data = $model->getinstansi(str_replace("/","",$param), $id);

					if($data){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $data
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function loadsoe()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];
				
					$model = new \App\Models\DataModel();
					$modelfiles = new \App\Models\FilesModel();

					$data = $model->getsoe(str_replace("/","",$param), $id);

					if($data){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $data
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}
	
	public function loadmonev()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$periode		 	  = $request->getVar('periode');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];
				
					$model = new \App\Models\DataModel();
					$modelfiles = new \App\Models\FilesModel();

					$data = $model->getmonev($param, $id, $periode);

					if($data){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $data
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function loadinformasi()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$periode		 	  = $request->getVar('periode');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];
				
					$model = new \App\Models\DataModel();
					$modelfiles = new \App\Models\FilesModel();

					$data = $model->getinformasi($param, $id, $periode);

					if($data){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		=> $data
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function addProgram(){

		$request  = $this->request;
		$param 	  = $request->getVar('param');
		$role 		= $this->data['role'];

		$model 	  = new \App\Models\ProgramModel();

		$data = [
						'kode_program' => $request->getVar('kode_program'),
						'nama_program' => $request->getVar('nama_program'),
						'created_by'	 => $role,
						'created_date' => $this->now,
						'updated_date' => $this->now,
        ];

		$res = $model->saveParam($param, $data);
		$id  = $model->insertID();

		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terkirim'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function addjadwal(){
		try {
			$request  = $this->request;
			$param 	  = $request->getVar('param');
			$date 	  = $request->getVar('date');
			$keterangan 	  = $request->getVar('keterangan');
			
			$role 		= $this->data['role'];
			$userid 	= $this->data['userid'];
			
			$model = new \App\Models\DataModel();
			
			$data = [

								'datetime' => $date,
								'keterangan' => $keterangan,
								'create_date' => $this->now,
								'update_date' => $this->now,
								'create_by' => $userid,

				];

		$res = $model->saveData($param, $data);
		$id  = $model->insertID();

		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terkirim'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;
		}
			catch (\Exception $e)
		{
			die($e->getMessage());
		}

	}

	public function addKegiatan(){

		$request  = $this->request;
		$param 	  = $request->getVar('param');
		$role 		= $this->data['role'];

		$model 	  = new \App\Models\KegiatanModel();

		if($request->getVar('param') == 'data_kegiatan'){
			$data = [
							'kode_program	' => $request->getVar('kode_program'),
							'kode_kegiatan' => $request->getVar('kode_kegiatan'),
							'nama_kegiatan' => $request->getVar('nama_kegiatan'),
							'created_by'		=> $role,
							'created_date'	=> $this->now,
							'updated_date'	=> $this->now,
					];
		}else if($request->getVar('param') == 'data_subkegiatan'){
			$data = [
							'kode_program	' => $request->getVar('kode_program'),
							'kode_kegiatan' => $request->getVar('kode_kegiatan'),
							'kode_subkegiatan' => $request->getVar('kode_subkegiatan'),
							'nama_subkegiatan' => $request->getVar('nama_subkegiatan'),
							'created_by'		=> $role,
							'created_date'	=> $this->now,
							'updated_date'	=> $this->now,
					];
		}else if($request->getVar('param') == 'data_paket'){
			$data = [
							'kode_program	' 	 => $request->getVar('kode_program'),
							'kode_kegiatan' 	 => $request->getVar('kode_kegiatan'),
							'kode_subkegiatan' => $request->getVar('kode_subkegiatan'),
							'nama_paket' 		=> $request->getVar('nama_paket'),
							'created_by'		=> $role,
							'created_date'	=> $this->now,
							'updated_date'	=> $this->now,
					];
		}

		$res = $model->saveParam($param, $data);
		$id  = $model->insertID();

		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terkirim'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function addTarget(){

		$request  = $this->request;
		$param 	  = $request->getVar('param');
		$role 		= $this->data['role'];

		$model 	  = new \App\Models\TargetModel();

		$data = [
						'kode_program'		=> $request->getVar('kode_program'),
						'kode_kegiatan'		=> $request->getVar('kode_kegiatan'),
						'kode_subkegiatan'=> $request->getVar('kode_subkegiatan'),
						'id_paket'				=> $request->getVar('id_paket'),
						'created_by'			=> $role,
						'created_date'		=> $this->now,
						'updated_date'		=> $this->now,
						'pagu'						=> $request->getVar('pagu_kegiatan'),
				];

		$databulan_k = [];
		$databulan_f = [];
		for ($i=1; $i <= 12; $i++) {
			$databulan_k['id_paket'] = $request->getVar('id_paket');
			$databulan_f['id_paket'] = $request->getVar('id_paket');

			$databulan_k['type'] = 'keuangan';
			$databulan_k['n'.$i] = $request->getVar('k'.$i);
			$databulan_f['type'] = 'fisik';
			$databulan_f['n'.$i] = $request->getVar('f'.$i);
		}

		// for ($i=1; $i <= 2; $i++) {
			// if($=1){
				$res_k = $model->saveParam('bulan_target', $databulan_k);

			// }else if($=2){
				$res_f = $model->saveParam('bulan_target', $databulan_f);
			// }
			// code...
		// }

		$res = $model->saveParam($param, $data);
		$id  = $model->insertID();

		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terkirim'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function addRealisasi(){

		$request  = $this->request;
		$param 	  = $request->getVar('param');
		$role 		= $this->data['role'];
		$userid 	= $this->data['userid'];

		$model 	  = new \App\Models\TargetModel();

		if($role == '30'){
			$type = 'fisik';
		}else{
			$type = 'keuangan';
		}

		$edited = $request->getVar('edited');
		if($edited){

			$data = [
				'created_by'		=> $userid,
				'updated_date'	=> $this->now
			];
		}else{
			$data = [
					'id_paket'			=> $request->getVar('id_paket'),
					'type'					=> $type,
					'kode_bulan'		=> $request->getVar('kode_bulan'),
					'created_by'		=> $userid,
					'created_date'	=> $this->now,
					'updated_date'	=> $this->now,
					'total'				  => $request->getVar('total_progres')
				];
			}

		if($request->getVar('m1')){
			$data['m1'] = $request->getVar('m1');
			$data['total']	= $request->getVar('m1');
		}else if($request->getVar('m2')){
			$data['m2'] = $request->getVar('m2');
			$data['total']	= $request->getVar('m2');
		}else if($request->getVar('m3')){
			$data['m3'] = $request->getVar('m3');
			$data['total']	= $request->getVar('m3');
		}else if($request->getVar('m4')){
			$data['m4'] = $request->getVar('m4');
			$data['total']	= $request->getVar('m4');
		}else if($request->getVar('m5')){
			$data['m5'] = $request->getVar('m5');
			$data['total']	= $request->getVar('m5');
		}

		if($edited){
			$idnya = $request->getVar('idnya');
			$res = $model->updateDong('bulan_realisasi', $idnya , $data);
		}else{
			$res = $model->saveParam('bulan_realisasi', $data);
		}

		$id  = $model->insertID();

		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terkirim'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function saveRealisasi(){

		$request  = $this->request;
		$param 	  = $request->getVar('param');
		$model 	  = new \App\Models\DataModel();
		$userid		= $this->data['userid'];

		for ($i=1; $i <= 11; $i++) { 
			
			$kom = $model->getKomponen($i);
			$data_komponen = $kom[0];
			
			$data_realisasi = [
				'id_komponen' => $i,
				'usd' 		  => $request->getVar('komponen_'.$i.'_usd'),
				'idr' 		  => $request->getVar('komponen_'.$i.'_idr'),
				'periode'	  => str_replace('/','',$request->getVar('periode')),
				'create_date' => $this->now,
				'create_by'   => $userid
				
			];
			
			$real = $model->saveData('realisasi', $data_realisasi);
			$id  = $model->insertID();

			$data_sisa = [
				'id_parent'   => $id,
				'usd' 		  => (int)str_replace(".","", $data_komponen->revisi_usd) - (int)str_replace(".", "", $request->getVar('komponen_'.$i.'_usd')),
				'idr' 		  => (int)str_replace(".", "", $data_komponen->revisi_idr) - (int)str_replace(".", "", $request->getVar('komponen_'.$i.'_idr')),
				
			];

			$data_persen = [
				'id_parent'   => $id,
				'usd' 		  => round(((int)str_replace(".", "", $request->getVar('komponen_'.$i.'_usd')) / (int)str_replace(".", "", $data_komponen->revisi_usd)) * 100),
				'idr' 		  => round(((int)str_replace(".", "", $request->getVar('komponen_'.$i.'_idr')) / (int)str_replace(".", "", $data_komponen->revisi_idr)) * 100),
				
			];

			$sisa = $model->saveData('sisa_dipa', $data_sisa);
			$persen = $model->saveData('persen', $data_persen);
		}

		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terkirim'
		];

		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function cekperiode()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];

				if($this->logged){
					$model = new \App\Models\DataModel();
					$modelfiles = new \App\Models\FilesModel();

					$data = $model->cekperiode(str_replace("/","",$param));
					
					if($data){
						$response = [
							'status'   => 'exist',
							'code'     => '1',
						];
					}else{
						$response = [
						    'status'   => 'not exist',
						    'code'     => '0',
						];
					}

				}else{
					$response = [
							'status'   => 'gagal',
							'code'     => '0',
							'data' 		 => 'silahkan login'
					];
				}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function loadperiode()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];

					$model = new \App\Models\DataModel();
					$modelfiles = new \App\Models\FilesModel();
					
					$data = $model->loadperiode();
					
					if($data){
						$response = [
							'status'   => 'success',
							'code'     => '1',
							'data'		=> $data
						];
					}else{
						$response = [
						    'status'   => 'failed',
						    'code'     => '0',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function loadjadwal()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];

					$model = new \App\Models\DataModel();
					$modelfiles = new \App\Models\FilesModel();
					
					$data = $model->loadjadwal();
					
					if($data){
						$response = [
							'status'   => 'success',
							'code'     => '1',
							'data'		=> $data
						];
					}else{
						$response = [
						    'status'   => 'failed',
						    'code'     => '0',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function addParam(){

		$request  = $this->request;
		$param 	  = $request->getVar('param');
		$model 	  = new \App\Models\ParamModel();

		$data = [
						'satuan_code' => $request->getVar('satuan_code'),
						'satuan_name'	=> $request->getVar('satuan_name'),
						'satuan_desc' => $request->getVar('satuan_desc'),
        ];

		$res = $model->saveParam($param, $data);
		$id  = $model->insertID();

		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terkirim'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}


	public function saveAspek(){

		$request  = $this->request;
		$param 	  = $request->getVar('param');
		$role 		= $this->data['role'];
		$userid		= $this->data['userid'];
		$model 	  = new \App\Models\DataModel();
		
		if($request->getVar('id')){
			$datas = [
				'aspek' => $request->getVar('aspek'),
				'kode_aspek' => $request->getVar('kode_aspek'),
				'nomor' => $request->getVar('nomor'),
				'kota' => $request->getVar('kota'),
				'nilai' => $request->getVar('nilai'),
				'keterangan' => $request->getVar('keterangan'),
				'sumber' => $request->getVar('sumber'),
				'tahun' => $request->getVar('tahun'),
				'note' => $request->getVar('note'),
				'url' => $request->getVar('url'),
				'update_by' => $userid,
				'update_Date' => $this->now
			];
			;
			$res = $model->updateMonev($request->getVar('id'), $datas);
		}else{
			$data = [
							// 'kode_aspek' => $request->getVar('kode_aspek'),
							// 'kode_indikator' => $request->getVar('kode_indikator'),
							// 'kode_parameter' => $request->getVar('kode_parameter'),
							// 'keterangan' => $request->getVar('keterangan'),
							// 'sumber' => $request->getVar('sumber'),
							// 'url' => $request->getVar('url'),
							// 'tahun' => $request->getVar('tahun'),
							// 'catatan' => $request->getVar('catatan'),
							// 'create_date' => $this->now,
							// 'create_by' => $userid,
						'aspek' => $request->getVar('aspek'),
						'kode_aspek' => $request->getVar('kode_aspek'),
						'nomor' => $request->getVar('nomor'),
						'kota' => $request->getVar('kota'),
						'nilai' => $request->getVar('nilai'),
						'keterangan' => $request->getVar('keterangan'),
						'sumber' => $request->getVar('sumber'),
						'tahun' => $request->getVar('tahun'),
						'note' => $request->getVar('note'),
						'url' => $request->getVar('url'),
						'create_by' => $userid,
						'update_by' => $userid,
						'create_date' => $this->now,
						'update_Date' => $this->now,


			];
			$res = $model->saveData('data_monev', $data);
			$id  = $model->insertID();
		}


		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terkirim'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function saveLahan(){

		$request  = $this->request;
		$param 	  = $request->getVar('param');
		$role 		= $this->data['role'];
		$userid		= $this->data['userid'];
		$model 	  = new \App\Models\DataModel();
		
		if($request->getVar('id')){
			$datas = [
				'kota_kab' => $request->getVar('kota_kab'),
				'lokasi' => $request->getVar('lokasi'),
				'koordinat' => $request->getVar('koordinat'),
				'desa_kel' => $request->getVar('desa_kel'),
				'kecamatan' => $request->getVar('kecamatan'),
				'luas' => $request->getVar('luas'),
				'status' => $request->getVar('status'),
				'status_1' => $request->getVar('status_1'),
				'keterangan' => $request->getVar('keterangan'),
				'link_surat_minat' => $request->getVar('link_surat_minat'),
				'link_sertifikat' => $request->getVar('link_sertifikat'),
				'link_surat_aset' => $request->getVar('link_surat_aset'),
				'link_surat_penyediaan' => $request->getVar('link_surat_penyediaan'),
				'link_surat_kesiapan' => $request->getVar('link_surat_kesiapan'),
				'link_surat_kesesuaian' => $request->getVar('link_surat_kesesuaian'),
				'link_dokumen_lingkungan' => $request->getVar('link_dokumen_lingkungan'),
				'link_dokumen_sra' => $request->getVar('link_dokumen_sra'),

				'update_by' => $userid,
				'update_date' => $this->now
			];
			;
			$res = $model->updateLahan($request->getVar('id'), $datas);
		}else{
			$data = [

				'kota_kab' => $request->getVar('kota_kab'),
				'lokasi' => $request->getVar('lokasi'),
				'koordinat' => $request->getVar('koordinat'),
				'desa_kel' => $request->getVar('desa_kel'),
				'kecamatan' => $request->getVar('kecamatan'),
				'luas' => $request->getVar('luas'),
				'status' => $request->getVar('status'),
				'status_1' => $request->getVar('status_1'),
				'keterangan' => $request->getVar('keterangan'),
				'link_surat_minat' => $request->getVar('link_surat_minat'),
				'link_sertifikat' => $request->getVar('link_sertifikat'),
				'link_surat_aset' => $request->getVar('link_surat_aset'),
				'link_surat_penyediaan' => $request->getVar('link_surat_penyediaan'),
				'link_surat_kesiapan' => $request->getVar('link_surat_kesiapan'),
				'link_surat_kesesuaian' => $request->getVar('link_surat_kesesuaian'),
				'link_dokumen_lingkungan' => $request->getVar('link_dokumen_lingkungan'),
				'link_dokumen_sra' => $request->getVar('link_dokumen_sra'),

				'create_by' => $userid,
				'update_by' => $userid,
				'create_date' => $this->now,
				'update_date' => $this->now,

			];

			$res = $model->saveData('data_lahan', $data);
			$id  = $model->insertID();
		}


		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terkirim'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function saveInformasi(){

		$request  = $this->request;
		$param 	  = $request->getVar('param');
		$role 		= $this->data['role'];
		$userid		= $this->data['userid'];
		$model 	  = new \App\Models\DataModel();
		
		if($request->getVar('id')){
			if($request->getVar('group') == '1'){
				$datas = [
					'tipe' => $request->getVar('tipe'),
					'kode' => $request->getVar('kode'),
					'nomor' => $request->getVar('nomor'),
					'isian' => $request->getVar('isian'),
					'sumber' => $request->getVar('sumber'),
					'tahun' => $request->getVar('tahun'),
					'keterangan' => $request->getVar('keterangan'),
					'update_by' => $userid,
					'update_date' => $this->now,
					'kota' => $request->getVar('kota'),
					'group' => $request->getVar('group'),
					'periode' => $request->getVar('periode'),
				];
			}else if($request->getVar('group') == '2'){
				$datas = [
					'tipe' => $request->getVar('tipe'),
					'kode' => $request->getVar('kode'),
					'nomor' => $request->getVar('nomor'),
					'jumlah1' => $request->getVar('jumlah1'),
					'kapasitas1' => $request->getVar('kapasitas1'),
					'sumber1' => $request->getVar('sumber1'),
					'tahun1' => $request->getVar('tahun1'),
					'kapasitas2' => $request->getVar('kapasitas2'),
					'ritasi' => $request->getVar('ritasi'),
					'jumlah2' => $request->getVar('jumlah2'),
					'kapasitas3' => $request->getVar('kapasitas3'),
					'sumber2' => $request->getVar('sumber2'),
					'tahun2' => $request->getVar('tahun2'),
					'keterangan' => $request->getVar('keterangan'),
					'update_by' => $userid,
					'update_date' => $this->now,
					'kota' => $request->getVar('kota'),
					'group' => $request->getVar('group'),
					'periode' => $request->getVar('periode'),
				];

				

			}else if($request->getVar('group') == '3'){
				$datas = [
					'tipe' => $request->getVar('tipe'),
					'kode' => $request->getVar('kode'),
					'nomor' => $request->getVar('nomor'),
					'jumlah' => $request->getVar('jumlah'),
					'sumber' => $request->getVar('sumber'),
					'tahun' => $request->getVar('tahun'),
					'update_by' => $userid,
					'update_date' => $this->now,
					'kota' => $request->getVar('kota'),
					'group' => $request->getVar('group'),
					'periode' => $request->getVar('periode'),
				];
			}else if($request->getVar('group') == '4'){
				$datas = [
					'tipe' => $request->getVar('tipe'),
					'kode' => $request->getVar('kode'),
					'nomor' => $request->getVar('nomor'),
					'jumlah' => $request->getVar('jumlah'),
					'sumber' => $request->getVar('sumber'),
					'tahun' => $request->getVar('tahun'),
					'keterangan' => $request->getVar('keterangan'),
					'update_by' => $userid,
					'update_date' => $this->now,
					'kota' => $request->getVar('kota'),
					'group' => $request->getVar('group'),
					'periode' => $request->getVar('periode'),
				];
			}
			
			$res = $model->updateInformasi($request->getVar('id'), $datas);
		}else{
			
			if($request->getVar('group') == '1'){
				$data = [

					'tipe' => $request->getVar('tipe'),
					'kode' => $request->getVar('kode'),
					'nomor' => $request->getVar('nomor'),
					'isian' => $request->getVar('isian'),
					'sumber' => $request->getVar('sumber'),
					'tahun' => $request->getVar('tahun'),
					'keterangan' => $request->getVar('keterangan'),
					'create_by' => $userid,
					'update_by' => $userid,
					'create_date' => $this->now,
					'update_date' => $this->now,
					'kota' => $request->getVar('kota'),
					'group' => $request->getVar('group'),
					'periode' => $request->getVar('periode'),

				];
			}else if($request->getVar('group') == '2'){
				$data = [
					'tipe' => $request->getVar('tipe'),
					'kode' => $request->getVar('kode'),
					'nomor' => $request->getVar('nomor'),
					'jumlah1' => $request->getVar('jumlah1'),
					'kapasitas1' => $request->getVar('kapasitas1'),
					'sumber1' => $request->getVar('sumber1'),
					'tahun1' => $request->getVar('tahun1'),
					'kapasitas2' => $request->getVar('kapasitas2'),
					'ritasi' => $request->getVar('ritasi'),
					'jumlah2' => $request->getVar('jumlah2'),
					'kapasitas3' => $request->getVar('kapasitas3'),
					'sumber2' => $request->getVar('sumber2'),
					'tahun2' => $request->getVar('tahun2'),
					'keterangan' => $request->getVar('keterangan'),
					'create_by' => $userid,
					'update_by' => $userid,
					'create_date' => $this->now,
					'update_date' => $this->now,
					'kota' => $request->getVar('kota'),
					'group' => $request->getVar('group'),
					'periode' => $request->getVar('periode'),
				];

			}else if($request->getVar('group') == '3'){
				
				$data = [
					'tipe' => $request->getVar('tipe'),
					'kode' => $request->getVar('kode'),
					'nomor' => $request->getVar('nomor'),
					'jumlah' => $request->getVar('jumlah'),
					'sumber' => $request->getVar('sumber'),
					'tahun' => $request->getVar('tahun'),
					'create_by' => $userid,
					'update_by' => $userid,
					'create_date' => $this->now,
					'update_date' => $this->now,
					'kota' => $request->getVar('kota'),
					'group' => $request->getVar('group'),
					'periode' => $request->getVar('periode'),
				];
			}else if($request->getVar('group') == '4'){
				$data = [
					'tipe' => $request->getVar('tipe'),
					'kode' => $request->getVar('kode'),
					'nomor' => $request->getVar('nomor'),
					'jumlah' => $request->getVar('jumlah'),
					'sumber' => $request->getVar('sumber'),
					'tahun' => $request->getVar('tahun'),
					'keterangan' => $request->getVar('keterangan'),
					'create_by' => $userid,
					'update_by' => $userid,
					'create_date' => $this->now,
					'update_date' => $this->now,
					'kota' => $request->getVar('kota'),
					'group' => $request->getVar('group'),
					'periode' => $request->getVar('periode'),
				];
			}

			$res = $model->saveData('data_informasi_umum', $data);
			$id  = $model->insertID();
		}


		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terkirim'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function savePelelangan(){

		$request  = $this->request;
		$param 	  = $request->getVar('param');
		$role 		= $this->data['role'];
		$userid		= $this->data['userid'];
		$model 	  = new \App\Models\DataModel();
		
		if($request->getVar('id')){
			$datas = [
				'pemenuhan' => $request->getVar('pemenuhan'),
				'alokasi' => $request->getVar('alokasi'),
				'progress' => $request->getVar('progress'),
				'realisasi' => $request->getVar('realisasi'),
				'kode' => $request->getVar('kode'),
				'update_by' => $userid,
				'update_Date' => $this->now
			];
			;
			$res = $model->updatepelelangan($request->getVar('id'), $datas);
		}else{
			$data = [
						'pemenuhan' => $request->getVar('pemenuhan'),
						'alokasi' => $request->getVar('alokasi'),
						'progress' => $request->getVar('progress'),
						'realisasi' => $request->getVar('realisasi'),
						'kode' => $request->getVar('kode'),
						'create_by' => $userid,
						'update_by' => $userid,
						'create_date' => $this->now,
						'update_Date' => $this->now,


			];
			$res = $model->saveData('data_pelelangan', $data);
			$id  = $model->insertID();
		}


		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terkirim'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function addUser(){

		$request  = $this->request;
		$param 	  = $request->getVar('param');
		$model 	  = new \App\Models\UserModel();

		$data = [
			'user_name' 		=> $request->getVar('user_name'),
			'user_email' 		=> $request->getVar('user_email'),
			'user_password' => password_hash($request->getVar('user_password'), PASSWORD_DEFAULT),
			'user_role' 		=> $request->getVar('user_role'),
			'user_fullname' => $request->getVar('user_fullname'),
			'user_satuan' 	=> $request->getVar('user_satuan'),
			'user_status' 	=> 1,
			'create_by' 		=> $this->data['userid'],
			'user_created_at'=> $this->now,
			'nip'=> $request->getVar('nip'),
		];

		$model->save($data);
		// $id  = $model->insertID();

		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terkirim'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function actionBerita(){

		$request  = $this->request;
		$role 		= $this->data['role'];
		$userid		= $this->data['userid'];

		$param 	  = $request->getVar('param');

		$model 	  = new \App\Models\BeritaModel();
		if($param['mode'] == 'headline'){
			$count = $model->countStatus();
			if($count >= 5){
				$data = [
					'update_date' => $this->now,
					'update_by' 	=> $userid,
					'status' 			=> 2,
				];
				$lastId = $model->getMaxId();

				if($param['id'] == $lastId){
					$lastId = $param['id'];
				}
				$model->update($lastId, $data);
			}

			$data = [
				'update_date' => $this->now,
				'update_by' 	=> $userid,
				'status' 			=> $param['stat'],
			];

			$res = $model->update($param['id'], $data);

		}else if($param['mode'] == 'delete'){
			$res = $model->delete($param['id']);
		}else if($param['mode'] == 'update'){
			switch ($param['stat']) {
				case 'false':
						$status = 0;
					break;

				default:
						$status = 2;
					break;
			}
			$data = [
									'update_date' => $this->now,
									'update_by' 	=> $userid,
									'status' => $status,
			        ];
				$res = $model->update($param['id'], $data);
		}

		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terupdate'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function actionKegiatan(){

		$request  = $this->request;
		$role 		= $this->data['role'];
		$userid		= $this->data['userid'];

		$param 	  = $request->getVar('param');

		$model 	  = new \App\Models\KegiatanModel();
		if($param['mode'] == 'headline'){
			$count = $model->countStatus();
			if($count >= 5){
				$data = [
					'update_date' => $this->now,
					'update_by' 	=> $userid,
					'status' 			=> 0,
				];
				$lastId = $model->getMaxId();
				$model->update($lastId, $data);
			}

			$data = [
				'update_date' => $this->now,
				'update_by' 	=> $userid,
				'status' 			=> $param['stat'],
			];

			$res = $model->update($param['id'], $data);

		}else if($param['mode'] == 'delete'){
			$res = $model->delete($param['id']);
		}else if($param['mode'] == 'update'){
			switch ($param['stat']) {
				case 'false':
						$status = 0;
					break;

				default:
						$status = 1;
					break;
			}
			$data = [
									'update_date' => $this->now,
									'update_by' 	=> $userid,
									'status' => $status,
			        ];
				$res = $model->update($param['id'], $data);
		}


		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terupdate'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function actionBeritaCovid(){

		$request  = $this->request;
		$role 		= $this->data['role'];
		$userid		= $this->data['userid'];

		$param 	  = $request->getVar('param');

		$model 	  = new \App\Models\BeritaModel();
		if($param['mode'] == 'headline'){
			$count = $model->countStatusCovid();
			if($count >= 5){
				$data = [
					'update_date' => $this->now,
					'update_by' 	=> $userid,
					'status' 			=> 2,
				];
				$lastId = $model->getMaxIdCovid();
				$model->updateBeritaCovid($lastId, $data);
			}

			$data = [
				'update_date' => $this->now,
				'status' 			=> $param['stat'],
			];
			$res = $model->updateBeritaCovid($param['id'], $data);

		}else if($param['mode'] == 'delete'){
			$res = $model->deleteDataCovid($param['id']);
		}else if($param['mode'] == 'update'){
			switch ($param['stat']) {
				case 'false':
						$status = 0;
					break;

				default:
						$status = 2;
					break;
			}
			$data = [
									'update_date' => $this->now,
									'update_by' 	=> $userid,
									'status' => $status,
			        ];
				$res = $model->updateBeritaCovid($param['id'], $data);
		}


		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terupdate'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function actionLaporCovid(){

		$request  = $this->request;
		$role 		= $this->data['role'];
		$userid		= $this->data['userid'];

		$param 	  = $request->getVar('param');
		$id				= $param['id'];

		$model 	  = new \App\Models\PengaduanModel();
		$modelfiles = new \App\Models\FilesModel();

		if($param['mode'] == 'view'){
			$data = $model->getLaporCovid($id);

			foreach ($data as $key => $value) {
				$data[$key]->lampiran  = $modelfiles->getWhere(['id_parent' => $value->id, 'type' => 'kerumunan'])->getResult();
			}

		}else if($param['mode'] == 'delete'){
			$res = $model->deleteDataCovid($param['id']);
		}else if($param['mode'] == 'update'){
			switch ($param['stat']) {
				case 'false':
						$status = 0;
					break;

				default:
						$status = 2;
					break;
			}
			$data = [
									'update_date' => $this->now,
									'update_by' 	=> $userid,
									'status' => $status,
			        ];
				$res = $model->updateBeritaCovid($param['id'], $data);
		}


		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => @$data
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function addKonten(){

		$request  = $this->request;
		$param 	  = $request->getVar('param');
		$mode 	  = $request->getVar('mode');
		$model 	  = new \App\Models\KontenModel();
		$modelfiles = new \App\Models\FilesModel();

		$files	  = $request->getFiles()['img'];
		$path			= FCPATH.'public';
		$tipe			= 'uploads/users/pelayanan/img';
		// $bagian 	= $request->getVar('nama_tujuan');
		$date 		= date('Y/m/d');
		$folder		= $path.'/'.$tipe.'/'.$date.'/';

		$data = [
			'satuan_pelayanan' => $request->getVar('satuan'),
			'jenis_pelayanan' => $request->getVar('jenis'),
			'konten' => $request->getVar('konten'),
			'banner' => null,
			'create_by' => $this->data['userid'],
			'create_date' => $this->now,
    ];

		$res = $model->insert($data);
		$id  = $model->insertID();

		if (!is_dir($folder)) {
		    mkdir($folder, 0777, TRUE);
		}
		// print_r($id);die;
		if($id){
			foreach($files as $idx => $img){

				$stat = $img->move($folder, $img->getName());

				$datalampiran = [
					'id_parent' => $id,
					'file_name' => $img->getName(),
					'extention' => null,
					'size' => $img->getSize('kb'),
					'path' => $tipe.'/'.$date.'/',
					'type' => 'pelayanan',
					'create_date' => $this->now,
					'update_date' => $this->now,
		    ];
				$modelfiles->insert($datalampiran);
				// $saveupload = $model->saveDataUpload($datalampiran);
			}
		}

		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terkirim'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function loadKonten()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];

					$model = new \App\Models\KontenModel();
					$modelparam = new \App\Models\ParamModel();
					$modelfiles = new \App\Models\FilesModel();

					if($param == 'post'){
						$fulldata = [];
						$databerita = $model->getKontenByid($id);
						foreach ($databerita as $keyberita => $valueberita) {

							$datafiles = $modelfiles->getWhere(['id_parent' => $valueberita->id])->getResult();
							$datasatuan= $model->getSatuanByCode($valueberita->satuan_pelayanan);
							$obj_merged = (object) array_merge((array) $valueberita, (array) $datasatuan);
							$obj_merged->lampiran = (array) $datafiles;
							array_push($fulldata, $obj_merged);
						}
						$berita = $fulldata;
					}else{
							if($param && $id){
								$data = $modelparam->getparam($param, $id);
							}else{
								$data = $model->getSatuan();
							}

							$berita = [];
							foreach ($data as $key => $value) {
								$fulldata = [];
								$databerita = $model->loadKegiatan($value->satuan_code);
								foreach ($databerita as $keyberita => $valueberita) {
									$datafiles = $modelfiles->getWhere(['id_parent' => $valueberita->id])->getRow();
									$obj_merged = (object) array_merge((array) $valueberita, (array) $datafiles);
									array_push($fulldata, $obj_merged);
								}
								$berita[$value->satuan_name] = $fulldata;
							}
						}

					if($berita){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $berita
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	function kawalcorona(){

		$curl = curl_init();

		curl_setopt_array($curl, array(
		  CURLOPT_URL => "https://api.kawalcorona.com/indonesia/provinsi/",
		  CURLOPT_RETURNTRANSFER => true,
		  CURLOPT_ENCODING => "",
		  CURLOPT_MAXREDIRS => 10,
		  CURLOPT_TIMEOUT => 0,
		  CURLOPT_FOLLOWLOCATION => true,
		  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		  CURLOPT_CUSTOMREQUEST => "GET",
		  CURLOPT_HTTPHEADER => array(
		    "Cookie: __cfduid=d9578df7ba02ceb3ed84751b41a36c0391610346454"
		  ),
		));

		$response = curl_exec($curl);

		curl_close($curl);
		$result = [
			'status'   => 'sukses',
			'code'     => $this->now,
			'data' 		 => json_decode($response, true)
		];

		header('Content-Type: application/json');
		echo json_encode($result);
		exit;
	}

	function coronas(){
		$curl = curl_init();

		curl_setopt_array($curl, array(
		  CURLOPT_URL => "https://dashboard-pikobar-api.digitalservice.id/v2/kasus/harian?wilayah=kota&kode_kab=3211",
		  CURLOPT_RETURNTRANSFER => true,
		  CURLOPT_ENCODING => "",
		  CURLOPT_MAXREDIRS => 10,
		  CURLOPT_TIMEOUT => 0,
		  CURLOPT_FOLLOWLOCATION => true,
		  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		  CURLOPT_CUSTOMREQUEST => "GET",
		  CURLOPT_HTTPHEADER => array(
		    "api-key: 480d0aeb78bd0064d45ef6b2254be9b3"
		  ),
		));

		$response = curl_exec($curl);

		curl_close($curl);
		// echo $response;
		print_r($response);die;
	}

	public function loadusers()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];

					$model = new \App\Models\UserModel();
					$modelfiles = new \App\Models\FilesModel();

						$fulldata = [];
						$datauser = $model->getUsers($userid);
						foreach ($datauser as $keyuser => $valueuser) {
							$datafiles = $modelfiles->getWhere(['id_parent' => $valueuser['user_id']])->getRow();
							$obj_merged = (object) array_merge((array) $valueuser, (array) $datafiles);
							array_push($fulldata, $obj_merged);
						}
						$users = $fulldata;

					if($users){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $users
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function actionUsers(){

		$request  = $this->request;
		$mode 	  = $request->getVar('mode');
		$id 	  	= $request->getVar('id');
		$status 	= $request->getVar('status');
		$role 		= $this->data['role'];
		$userid		= $this->data['userid'];

		switch ($status) {
			case 'false':
					$status = 0;
				break;

			default:
					$status = 1;
				break;
		}
		$model 	  = new \App\Models\UserModel();

		$data = [
						'update_date' => $this->now,
						'update_by' 	=> $userid,
						'user_status' => $status,
        ];
		if($mode == 'update'){
			$res = $model->update($id, $data);

		}else{
			$res = $model->delete(['user_id' => $id]);
		}
		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terupdate'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function actionRealisasi(){

		$request  	= $this->request;
		$mode 	  	= $request->getVar('mode');
		$id 	  	= $request->getVar('id');
		$role 		= $this->data['role'];
		$userid		= $this->data['userid'];
		
		$model 	  	= new \App\Models\DataModel();
		$data = [
			'update_date' 	=> $this->now,
			'create_by' 	=> $userid,
			'usd'		=> $request->getVar('real_usd'),
			'idr' 		=> $request->getVar('real_idr')
        ];

		$data_sisa = [
			'usd' 		  => (int)str_replace(".","", $request->getVar('dipa_rev_usd')) - (int)str_replace(".", "", $request->getVar('real_usd')),
			'idr' 		  => (int)str_replace(".", "", $request->getVar('dipa_rev_idr')) - (int)str_replace(".", "", $request->getVar('real_idr')),
			
		];
		

		$data_persen = [
			'usd' 		  => round(((int)str_replace(".", "", $request->getVar('real_usd')) / (int)str_replace(".", "", $request->getVar('dipa_rev_usd'))) * 100),
			'idr' 		  => round(((int)str_replace(".", "", $request->getVar('real_idr')) / (int)str_replace(".", "", $request->getVar('dipa_rev_idr'))) * 100),
			
		];
		
		if($mode == 'update'){
			$res = $model->updateRealisasi('realisasi', 'id', $id, $data);
			$res1 = $model->updateRealisasi('sisa_dipa', 'id_parent', $id, $data_sisa);
			$res2 = $model->updateRealisasi('persen', 'id_parent', $id, $data_persen);

		}else{
			$res = $model->delete($table, $id);
		}
		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terupdate'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function actionData(){

		$request  = $this->request;
		$mode 	  = $request->getVar('mode');
		$id 	  	= $request->getVar('id');
		$status 	= $request->getVar('status');
		$table	 	= $request->getVar('table');
		$role 		= $this->data['role'];
		$userid		= $this->data['userid'];

		switch ($status) {
			case 'false':
					$status = 0;
				break;

			default:
					$status = 1;
				break;
		}
		$model 	  = new \App\Models\DataModel();

		$data = [
						'update_date' => $this->now,
						'update_by' 	=> $userid,
						'user_status' => $status,
        ];
		if($mode == 'update'){
			$res = $model->update($id, $data);

		}else{
			$res = $model->delete($table, $id);
		}
		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terupdate'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function actionJadwal(){

		$request  = $this->request;
		$mode 	  = $request->getVar('mode');
		$id 	  	= $request->getVar('id');
		$date 	= $request->getVar('date');
		$keterangan 	= $request->getVar('keterangan');
		$table	 	= $request->getVar('table');
		$role 		= $this->data['role'];
		$userid		= $this->data['userid'];

		
		$model 	  = new \App\Models\DataModel();

		$data = [
						'update_date' => $this->now,
						'update_by' 	=> $userid,
						'keterangan' => $keterangan,
						'datetime' => $date,
        ];
		if($mode == 'update'){
			$res = $model->updateJadwal($id, $data);

		}else{
			$res = $model->delete($table, $id);
		}
		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terupdate'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function loadkota(){
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];

					$model = new \App\Models\ParamModel();
					$modelfiles = new \App\Models\FilesModel();

					$data = $model->getkota($param, $id);

					if($data){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $data
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function deletelahan(){

		$request  = $this->request;
		$mode 	  = $request->getVar('mode');
		$id 	  	= $request->getVar('id');
		$status 	= $request->getVar('status');
		$role 		= $this->data['role'];
		$userid		= $this->data['userid'];

		$model 	  = new \App\Models\DataModel();

		
		$res = $model->deletelahan($id);
		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terhapus'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

}
