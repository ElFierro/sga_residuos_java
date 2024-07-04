package co.edu.usa.talentotech.sga.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@EqualsAndHashCode(callSuper=false)
@NoArgsConstructor
@ToString


@Document(collection = "route")
public class Route {
	@Id
    private String id;

    private String name;
    private List<Coordinate> coordinates;
}
