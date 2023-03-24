package com.example.anime.repository.account;

import com.example.anime.model.account.AccountRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Repository
public interface IAccountRoleRepository extends JpaRepository<AccountRole,Integer> {

    @Modifying
    @Query(value = "insert into account_role (account_id, role_id)\n" +
            "values\n" +
            "( :accountRoleId, :roleId )", nativeQuery = true)
    void createAccountRole(@Param("accountRoleId") Integer accountRoleId,
                           @Param("roleId") Integer roleId);
}
