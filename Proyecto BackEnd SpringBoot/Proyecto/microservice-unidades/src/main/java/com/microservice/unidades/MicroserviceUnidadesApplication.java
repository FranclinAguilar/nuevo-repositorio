package com.microservice.unidades;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class MicroserviceUnidadesApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroserviceUnidadesApplication.class, args);
	}

}
