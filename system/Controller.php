<?php namespace CodeIgniter;

/**
 * CodeIgniter
 *
 * An open source application development framework for PHP
 *
 * This content is released under the MIT License (MIT)
 *
 * Copyright (c) 2014 - 2016, British Columbia Institute of Technology
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * @package	CodeIgniter
 * @author	CodeIgniter Dev Team
 * @copyright	Copyright (c) 2014 - 2016, British Columbia Institute of Technology (http://bcit.ca/)
 * @license	http://opensource.org/licenses/MIT	MIT License
 * @link	http://codeigniter.com
 * @since	Version 3.0.0
 * @filesource
 */

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Validation\Exceptions\ValidationException;
use CodeIgniter\Validation\Validation;
use CodeIgniter\Services;
use CodeIgniter\Log\Logger;

/**
 * Class Controller
 *
 * @package CodeIgniter
 */
class Controller
{
	/**
	 * An array of helpers to be automatically loaded
	 * upon class instantiation.
	 *
	 * @var array
	 */
	protected $helpers = [];

	//--------------------------------------------------------------------

	/**
	 * Instance of the main Request object.
	 *
	 * @var RequestInterface
	 */
	protected $request;

	/**
	 * Instance of the main response object.
	 *
	 * @var ResponseInterface
	 */
	protected $response;

	/**
	 * Instance of logger to use.
	 * @var Log\Logger
	 */
	protected $logger;

	/**
	 * Whether HTTPS access should be enforced
	 * for all methods in this controller.
	 *
	 * @var int  Number of seconds to set HSTS header
	 */
	protected $forceHTTPS = 0;

	//--------------------------------------------------------------------

	/**
	 * Constructor.
	 *
	 * @param RequestInterface $request
	 * @param ResponseInterface $response
	 * @param Logger $logger
	 */
	public function __construct(RequestInterface $request, ResponseInterface $response, Logger $logger = null)
	{
	    $this->request = $request;

		$this->response = $response;

		$this->logger = is_null($logger) ? Services::logger(true) : $logger;

		$this->logger->info('Controller "'.get_class($this).'" loaded.');

		if ($this->forceHTTPS > 0)
		{
			$this->forceHTTPS($this->forceHTTPS);
		}

		$this->loadHelpers();
	}

	//--------------------------------------------------------------------

	/**
	 * A convenience method to use when you need to ensure that a single
	 * method is reached only via HTTPS. If it isn't, then a redirect
	 * will happen back to this method and HSTS header will be sent
	 * to have modern browsers transform requests automatically.
	 *
	 * @param int $duration The number of seconds this link should be
	 *                      considered secure for. Only with HSTS header.
	 *                      Default value is 1 year.
	 */
	public function forceHTTPS(int $duration = 31536000)
	{
	    force_https($duration, $this->request, $this->response);
	}

	//--------------------------------------------------------------------

	/**
	 * Provides a simple way to tie into the main CodeIgniter class
	 * and tell it how long to cache the current page for.
	 *
	 * @param int $time
	 */
	public function cachePage(int $time)
	{
		CodeIgniter::cache($time);
	}

	//--------------------------------------------------------------------

	/**
	 * Handles "auto-loading" helper files.
	 */
	protected function loadHelpers()
	{
	    if (empty($this->helpers)) return;

		foreach ($this->helpers as $helper)
		{
			helper($helper);
		}
	}

	//--------------------------------------------------------------------

	protected function validate($rules, array $messages = []): bool
	{
		$this->validator = Services::validation();

		// If you replace the $rules array with the name of the group
		if (is_string($rules))
		{
			$validation = config('Validation');

			// If the rule wasn't found in the \Config\Validation, we
			// should throw an exception so the developer can find it.
			if (! isset($validation->$rules))
			{
				throw ValidationException::forRuleNotFound($rules);
			}

			// If no error message is defined, use the error message in the Config\Validation file
			if (! $messages)
			{
				$errorName = $rules . '_errors';
				$messages  = $validation->$errorName ?? [];
			}

			$rules = $validation->$rules;
		}
		print_r($messages);die;

		return $this->validator
			->withRequest($this->request)
			->setRules($rules, $messages)
			->run();
	}

}
