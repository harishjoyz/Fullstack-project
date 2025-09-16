package com.project.service;

import java.util.List;

public interface CrudService<T, ID> {
	T save(T entity);

	List<T> findAll();

	T findById(ID id);

	T update(ID id, T entity);

	void delete(ID id);
}
