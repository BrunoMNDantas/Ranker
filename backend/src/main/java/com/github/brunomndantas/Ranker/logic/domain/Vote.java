package com.github.brunomndantas.ranker.logic.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Vote {

    private Collection<Assignment> assignments;

}
